import express from "express";
import { penawaran } from "../data/store.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { q, kategori } = req.query;

  let hasil = [...penawaran];

  if (q) {
    const kataKunci = q.toLowerCase();

    hasil = hasil.filter((item) => {
      return (
        item.nama.toLowerCase().includes(kataKunci) ||
        item.penyedia.toLowerCase().includes(kataKunci)
      );
    });
  }

  if (kategori) {
    hasil = hasil.filter((item) => item.kategori === kategori);
  }

  return res.status(200).json({
    success: true,
    data: hasil,
    meta: {
      jumlah: hasil.length
    }
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = penawaran.find((penawaranItem) => penawaranItem.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: {
        code: "OFFER_NOT_FOUND",
        message: "Penawaran tidak ditemukan."
      }
    });
  }

  return res.status(200).json({
    success: true,
    data: item
  });
});

export default router;