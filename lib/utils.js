import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils/processData.js

export function processData(data) {
  let totalShift1 = 0;
  let totalShift2 = 0;
  let totalShift3 = 0;
  console.log(data, "data");
  if (!data) return
  data.data.rows.rows.forEach(row => {
    const { Shift, eMandiri, eBri, eBni, eBca } = row;
    const total = eMandiri + eBri + eBni + eBca;

    if (Shift === 1) {
      totalShift1 += total;
    } else if (Shift === 2) {
      totalShift2 += total;
    } else if (Shift === 3) {
      totalShift3 += total;
    }
  });

  const total = totalShift1 + totalShift2 + totalShift3;

  return [
    {
      name: 'Shift 1',
      value: totalShift1,
      percentage: total ? (totalShift1 / total) * 100 : 0 + '%',
      fill: "#fbcf16"
    },
    {
      name: 'Shift 2',
      value: totalShift2,
      percentage: total ? (totalShift2 / total) * 100 : 0 + '%',
      fill: '#0d4ca1'

    },
    {
      name: 'Shift 3',
      value: totalShift3,
      percentage: total ? (totalShift3 / total) * 100 : 0 + '%',
      fill: '#000'
    }
  ];
}


export function calculateTransactionCounts(data) {
  let transactionCounts = {};

  // Mengambil data transaksi dari JSON
  const transactions = data.data.rows.rows;

  transactions.forEach((transaction) => {
    const { IdAsalGerbang, eMandiri, eBri, eBni, eBca } = transaction;

    if (!transactionCounts[IdAsalGerbang]) {
      transactionCounts[IdAsalGerbang] = { eMandiri: 0, eBri: 0, eBni: 0, eBca: 0 };
    }

    transactionCounts[IdAsalGerbang].eMandiri += eMandiri;
    transactionCounts[IdAsalGerbang].eBri += eBri;
    transactionCounts[IdAsalGerbang].eBni += eBni;
    transactionCounts[IdAsalGerbang].eBca += eBca;
  });

  return formatTransactionCounts(transactionCounts);;
}

function formatTransactionCounts(counts) {
  return Object.keys(counts).map(id => ({
    name: `Gerbang ${id}`, // Customize the name format if needed
    value: counts[id].eMandiri + counts[id].eBri + counts[id].eBni + counts[id].eBca
  }));
}


// lib/transaction.js

export function calculateTunaiTransactions(rows) {
  // Initialize a map to group the data
  // const rows = data.data.rows.rows;

  const result = [];

  // Group rows by IdCabang, IdGerbang, Tanggal, and IdGardu
  const groupedData = rows?.reduce((acc, row) => {
    const key = `${row.IdCabang}-${row.IdGerbang}-${row.Tanggal}-${row.IdGardu}`;
    if (!acc[key]) {
      acc[key] = {
        IdCabang: row.IdCabang,
        IdGerbang: row.IdGerbang,
        Tanggal: row.Tanggal,
        IdGardu: row.IdGardu,
        MetodePembayaran: 'Tunai',
        Golongan: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        Total: 0
      };
    }

    // Calculate total from DinasKary, DinasMitra, DinasOpr if Tunai > 0
    if (row.Tunai > 0) {
      const transactionTotal = row.Tunai

      // Add to appropriate golongan and total
      acc[key].Golongan[row.Golongan] += transactionTotal;
      acc[key].Total += transactionTotal;
    }

    return acc;
  }, {});

  // Convert grouped data to array format
  for (const key in groupedData) {
    result.push(groupedData[key]);
  }

  return result;
}

// lib/transaction.js



export function processTransactionData(rows) {
  // const rows = data.data.rows.rows;
  console.log('lib')
  console.log(rows);
  console.log('====================================');
  const result = [];

  // Helper function to calculate total from eBri, eBni, eBca
  const calculateTotal = (item) => {
    return item.eBri + item.eBni + item.eBca;
  };

  // Group rows by IdCabang, IdGerbang, Tanggal, and IdGardu
  const groupedData = rows?.reduce((acc, row) => {
    const key = `${row.IdCabang}-${row.IdGerbang}-${row.Tanggal}-${row.IdGardu}`;
    if (!acc[key]) {
      acc[key] = {
        IdCabang: row.IdCabang,
        IdGerbang: row.IdGerbang,
        Tanggal: row.Tanggal,
        IdGardu: row.IdGardu,
        MetodePembayaran: 'E-Toll',
        Golongan: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        Total: 0
      };
    }

    // Add to appropriate golongan and total
    acc[key].Golongan[row.Golongan] += calculateTotal(row);
    acc[key].Total += calculateTotal(row);

    return acc;
  }, {});

  // Convert grouped data to array format
  for (const key in groupedData) {
    result.push(groupedData[key]);
  }

  return result;
}

export function ktpTransaction(rows) {
  // const rows = data.data.rows.rows;

  const result = [];

  // Group rows by IdCabang, IdGerbang, Tanggal, and IdGardu
  const groupedData = rows?.reduce((acc, row) => {
    const key = `${row.IdCabang}-${row.IdGerbang}-${row.Tanggal}-${row.IdGardu}`;
    if (!acc[key]) {
      acc[key] = {
        IdCabang: row.IdCabang,
        IdGerbang: row.IdGerbang,
        Tanggal: row.Tanggal,
        IdGardu: row.IdGardu,
        MetodePembayaran: 'KTP',
        Golongan: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        Total: 0
      };
    }

    // Calculate total from DinasKary, DinasMitra, DinasOpr
    const transactionTotal = row.DinasKary + row.DinasMitra + row.DinasOpr;

    // Add to appropriate golongan and total
    acc[key].Golongan[row.Golongan] += transactionTotal;
    acc[key].Total += transactionTotal;

    return acc;
  }, {});

  // Convert grouped data to array format
  for (const key in groupedData) {
    result.push(groupedData[key]);
  }

  return result;
}

export function calculateTotalsByCabang(data) {
  const totalsByCabang = {};

  // Initialize totals for all cabangs
  const overallTotals = {
    golongan1: 0,
    golongan2: 0,
    golongan3: 0,
    golongan4: 0,
    golongan5: 0,
    grandTotal: 0
  };

  // Iterate through the data array
  data.forEach(item => {
    const { IdCabang, Golongan } = item;

    // Initialize the IdCabang in the totalsByCabang if not already present
    if (!totalsByCabang[IdCabang]) {
      totalsByCabang[IdCabang] = {
        golongan1: 0,
        golongan2: 0,
        golongan3: 0,
        golongan4: 0,
        golongan5: 0,
        total: 0
      };
    }

    // Accumulate the totals for each golongan
    totalsByCabang[IdCabang].golongan1 += Golongan["1"] || 0;
    totalsByCabang[IdCabang].golongan2 += Golongan["2"] || 0;
    totalsByCabang[IdCabang].golongan3 += Golongan["3"] || 0;
    totalsByCabang[IdCabang].golongan4 += Golongan["4"] || 0;
    totalsByCabang[IdCabang].golongan5 += Golongan["5"] || 0;

    // Calculate total for the current item and add to cabang total
    const cabangTotal = (totalsByCabang[IdCabang].golongan1
      + totalsByCabang[IdCabang].golongan2
      + totalsByCabang[IdCabang].golongan3
      + totalsByCabang[IdCabang].golongan4
      + totalsByCabang[IdCabang].golongan5);

    totalsByCabang[IdCabang].total = cabangTotal;

    // Accumulate overall totals
    overallTotals.golongan1 += Golongan["1"] || 0;
    overallTotals.golongan2 += Golongan["2"] || 0;
    overallTotals.golongan3 += Golongan["3"] || 0;
    overallTotals.golongan4 += Golongan["4"] || 0;
    overallTotals.golongan5 += Golongan["5"] || 0;
    overallTotals.grandTotal += cabangTotal;
  });

  // Convert totalsByCabang object to array
  const totalsByCabangArray = Object.keys(totalsByCabang).map(idCabang => ({
    IdCabang: idCabang,
    golongan1: totalsByCabang[idCabang].golongan1,
    golongan2: totalsByCabang[idCabang].golongan2,
    golongan3: totalsByCabang[idCabang].golongan3,
    golongan4: totalsByCabang[idCabang].golongan4,
    golongan5: totalsByCabang[idCabang].golongan5,
    total: totalsByCabang[idCabang].total
  }));

  return {
    totalsByCabangArray,
    overallTotals
  };

}

export function getDayFromDate(dateString) {
  const date = new Date(dateString);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return days[date.getDay()];
}
