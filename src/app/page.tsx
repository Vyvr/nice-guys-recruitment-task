import { redirect } from "next/navigation";

export const Home: React.FC = () => {
  redirect("/dashboard");
};

export default Home;
