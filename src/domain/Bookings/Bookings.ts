"use client";
import { api } from "@/api/api";
import Cookies from "js-cookie";

export type BookingProps = {
  id: number;
  vehicle_details: {
    car_name: string;
    car_type: string;
    car_image: string;
  };
  from_route: string;
  to_route: string;
  date: string;
  hour: string;
  duration: string;
  estimated_time: string | null;
  distance_km: number;
  booking_for: "myself" | "someone_else";
  first_name: string;
  last_name: string;
  title: "Mr" | "Ms";
  email: string;
  phone_number: string;
  notes: string | null;
  amount: string;
  payment_date: Date;
  payment_intent_id: string;
  payment_status: "approved" | "canceled";
  payment_brand: string;
  booking_date: Date;
  user: number;
  vehicle: number;
};
const token = Cookies.get("NEVESJR_TOKEN");

const getFutureUserBookings = async (userId: string) => {
  try {
    const { data } = await api.get<BookingProps[]>(
      `/booking/future/user/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const getPastUserBookings = async (userId: string) => {
  try {
    const { data } = await api.get<BookingProps[]>(
      `/booking/past/user/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const getCanceledUserBookings = async (userId: string) => {
  try {
    const { data } = await api.get<BookingProps[]>(
      `/booking/canceled/user/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const postCancelBooking = async (bookingId: number) => {
  try {
    const { data } = await api.post(`/booking/cancel/${bookingId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao cancelar a reserva do usuário:", error);
    throw error;
  }
};

export {
  getFutureUserBookings,
  getPastUserBookings,
  getCanceledUserBookings,
  postCancelBooking,
};
