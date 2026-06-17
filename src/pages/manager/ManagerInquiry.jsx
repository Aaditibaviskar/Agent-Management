import React, { useEffect, useState } from "react";
import axios from "axios";

function ManagerInquiry() {
  const [inquiries, setInquiries] =
    useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/Leads")
      .then((res) =>
        setInquiries(res.data)
      );
  }, []);

  return (
    <>
      <h2>User Inquiries</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {inquiries.map((i) => (
            <tr key={i.inquiryId}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManagerInquiry;