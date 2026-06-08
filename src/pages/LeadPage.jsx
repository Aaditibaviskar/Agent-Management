// import React, { useEffect, useState } from "react";

// function LeadPage() {
// const [leads, setLeads] = useState([]);

// useEffect(() => {
// fetchLeads();
// }, []);

// const fetchLeads = async () => {
// try {
// const response = await fetch("http://localhost:8080/api/leads");
// const data = await response.json();
// setLeads(data);
// } catch (error) {
// console.error("Error fetching leads:", error);
// }
// };

// return ( <div className="container mt-4"> <h2>Lead Management</h2>

// ```
//   <table className="table table-bordered">
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Name</th>
//         <th>Phone</th>
//         <th>Email</th>
//         <th>Budget</th>
//         <th>Status</th>
//       </tr>
//     </thead>

//     <tbody>
//       {leads.map((lead) => (
//         <tr key={lead.leadId}>
//           <td>{lead.leadId}</td>
//           <td>{lead.name}</td>
//           <td>{lead.phone}</td>
//           <td>{lead.email}</td>
//           <td>{lead.budget}</td>
//           <td>{lead.status}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// ```

// );
// }

// export default LeadPage;
