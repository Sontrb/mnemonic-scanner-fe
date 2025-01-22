import PrivateRoute from "@/components/PrivateRoute";
import HomeView from "@/views/Home";

const Home = () => (
	<PrivateRoute>
		<HomeView />
	</PrivateRoute>
);

export default Home;
