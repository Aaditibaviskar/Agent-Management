import axios from "axios";

const API =
"http://localhost:8080/reports";

export const getDashboardData =
() =>
axios.get(
`${API}/dashboard`
);
