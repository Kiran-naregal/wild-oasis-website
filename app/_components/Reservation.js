import { auth } from '../_lib/auth';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import DateSelector from './DateSelector'
import LoginMessage from './LoginMessage';
import ReservationForm from './ReservationForm'

export default async function Reservation({ cabin }) {
    const session = await auth();
    const dates = await getBookedDatesByCabinId(cabin.id);
    const settings = await getSettings();
    return (
        <div className="grid grid-cols-2 min-h-[400px] ">
            <DateSelector cabin={cabin} settings={settings} bookedDates={dates} />
            {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
        </div>
    )
}
