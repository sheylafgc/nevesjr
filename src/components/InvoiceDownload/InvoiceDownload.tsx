"use client";
import { api } from "@/api/api";
import { useState } from "react";
import Cookies from "js-cookie";
import { MdOutlineFileDownload } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { saveAs } from "file-saver";

interface InvoiceDownloadProps {
  payment_intent_id: string;
}

export default function InvoiceDownload({
  payment_intent_id,
}: InvoiceDownloadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("NEVESJR_TOKEN");

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/payment/receipt/${payment_intent_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      if (!data) {
        throw new Error("Error fetching the invoice");
      }

      const blob = new Blob([data], { type: "application/pdf" });

      saveAs(blob, `invoice_${payment_intent_id}.pdf`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full flex flex-row items-center justify-center gap-1 font-bold"
      >
        {!loading && <MdOutlineFileDownload size={18} />}
        {loading ? <ClipLoader size={20} /> : "Download"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
