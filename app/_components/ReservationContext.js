"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initalRange = {
    from: undefined, to: undefined,
};

function ReservationProvider({ children }) {
    const [range, setRange] = useState(initalRange);

    const resetRange = () => {
        setRange(initalRange);
    }
    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>
}

function useReservation() {
    const context = useContext(ReservationContext);

    if (!context) throw new Error("ReservationContext used outside provider");

    return context;
}

export { ReservationProvider, useReservation };