"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error("Guest is not loged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Not a valid national ID");
    const updateData = { nationalID, nationality, countryFlag };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) throw new Error('Guest could not be updated');

    revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error("Guest is not loged in");

    //Checking if booking belong to current loged in user
    const guestBookings = await getBookings(session.user.guestId);
    const BookingIDs = guestBookings.map(booking => booking.id);
    if (!BookingIDs.includes(bookingId)) throw new Error("Your are not allowed to delete this booking");

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")
}

export async function updateReservation(formData) {
    const session = await auth();
    if (!session) throw new Error("Guest is not loged in");
    let id = formData.get("id");
    id = Number(id);

    const bookings = await getBookings(session.user.guestId);
    const BookingIDs = bookings.map(booking => booking.id);

    if (!BookingIDs.includes(id)) throw new Error("Your not allowed to make changes to this reservation");

    const numGuests = Number(formData.get("numGuests"));
    const observations = formData.get("observations").slice(0, 1000);
    const updatedFields = { numGuests, observations };

    const { error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', id);

    if (error) throw new Error('Booking could not be updated');
    revalidatePath("/account/reservations");
    revalidatePath(`/account/reservations/edit/${id}`);
    redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error("Guest is not loged in");

    const newBooking = {
        ...bookingData,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get("observations"),
        isPaid: false,
        totalPrice: bookingData.cabinPrice,
        guestId: session.user.guestId,
        status: "unconfirmed",
        hasBreakfast: false,
        extrasPrice: 0
    }

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking]);

    if (error) throw new Error('Booking could not be created');

    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect("/cabins/thankyou");
}