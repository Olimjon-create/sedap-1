import Head from "next/head";
import MainLayout from "@/components/common/layouts/MainLayout";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar } from "@mui/material";

export default function Customers() {
  const [deletedIds, setDeletedIds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreateAnalic = () => {
    setSnackbarOpen(true);
  };

  const openConfirmDialog = (email) => {
    setSelectedEmail(email);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    setDeletedIds((prev) => [...prev, selectedEmail]);
    setOpenDialog(false);
    setSelectedEmail(null);
  };

  const customersList = [
    {
      name: "Olimjon Xamrqulov",
      email: "xamraqulovolimjon33@gmail.com",
      status: "Active",
      date: "2024-05-01",
    },
    {
      name: "Olimjon Xamrqulov",
      email: "xamraqulovolimjon22@gmail.com",
      status: "Inactive",
      date: "2024-04-15",
    },
    {
      name: "Olimjon Xamraqulov",
      email: "olimjonxamraqulov6@gmail.com",
      status: "Active",
      date: "2024-05-20",
    },
    {
      name: "Olimjon Xamraqulov",
      email: "olimjonxamraqulov1@gmail.com",
      status: "Active",
      date: "2024-05-20",
    },
    {
      name: "Olimjon Xamraqulov",
      email: "olimjonxamraqulov4@gmail.com",
      status: "Active",
      date: "2024-05-20",
    },
    {
      name: "Olimjon Xamraqulov",
      email: "olimjonxamraqulov3@gmail.com",
      status: "Active",
      date: "2024-05-20",
    },
  ].filter((customer) => !deletedIds.includes(customer.email));

  return (
    <>
      <Head>
        <title>Customers List</title>
        <meta
          name="description"
          content="List and analytics of all customers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          padding: "24px",
          fontFamily: "Arial, sans-serif",
          background: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Customers
        </h1>
        <p style={{ color: "#555", marginBottom: "24px" }}>
          Overview and details of registered customers
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            { title: "Total Customers", value: "1,245" },
            { title: "Active Customers", value: "980" },
            { title: "New Signups This Month", value: "120" },
            { title: "Churn Rate", value: "4.5%" },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                flex: "1 1 220px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <p
                style={{ fontSize: "15px", color: "#888", marginBottom: "6px" }}
              >
                {card.title}
              </p>
              <p style={{ fontSize: "22px", fontWeight: 600 }}>{card.value}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <select
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <option
              style={{
                cursor: "pointer",
              }}
              value="all"
            >
              All Statuses
            </option>
            <option
              style={{
                cursor: "pointer",
              }}
              value="active"
            >
              Active
            </option>
            <option
              style={{
                cursor: "pointer",
              }}
              value="inactive"
            >
              Inactive
            </option>
          </select>

          <input
            type="date"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            overflowX: "auto",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            borderRadius: "10px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead style={{ backgroundColor: "#e5e7eb", color: "#222" }}>
              <tr>
                {["Name", "Email", "Status", "Signup Date", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      style={{ textAlign: "left", padding: "16px" }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderTop: "1px solid #ddd",
                    backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={{ padding: "16px" }}>{customer.name}</td>
                  <td style={{ padding: "16px" }}>{customer.email}</td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        backgroundColor:
                          customer.status === "Active" ? "#d1fae5" : "#fee2e2",
                        color:
                          customer.status === "Active" ? "#065f46" : "#991b1b",
                        padding: "6px 10px",
                        fontSize: "13px",
                        borderRadius: "4px",
                        fontWeight: 500,
                      }}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>{customer.date}</td>
                  <td style={{ padding: "16px" }}>
                    <button
                      onClick={handleCreateAnalic}
                      style={{
                        color: "#2563eb",
                        fontSize: "14px",
                        cursor: "pointer",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        marginRight: "12px",
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => openConfirmDialog(customer.email)}
                      style={{
                        color: "#dc2626",
                        fontSize: "18px",
                        cursor: "pointer",
                        border: "none",
                        background: "transparent",
                      }}
                      title="Delete"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          Are you sure you want to delete {selectedEmail}?
        </DialogTitle>
        <div style={{ padding: "0 24px 24px" }}>
          <button
            onClick={confirmDelete}
            style={{
              marginRight: "12px",
              background: "#dc2626",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setOpenDialog(false)}
            style={{
              background: "#ccc",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">This is a success Alert.</Alert>
      </Snackbar>
    </>
  );
}

Customers.getLayout = (pageProps) => (
  <MainLayout>
    <Customers {...pageProps} />
  </MainLayout>
);
