import CenterFeed from "./centerFeed";
import RightBar from "./rightBar";
import RightMenu from "./rightMenu";
import DashboardGreeting from "./components/DashboardGreeting";
import DashboardStatsCards from "./components/DashboardStatsCards";

const Home = () => {
  return (
    <div className="w-full">
      {/* Main dashboard area + far-right avatar strip */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_56px] pr-6">
        <div className="min-w-0 space-y-5">
          <DashboardGreeting />

          {/* Feed + quick links side by side (matches template) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-4">
              <DashboardStatsCards />
              <CenterFeed />
            </div>

            <div className="hidden lg:block min-w-0">
              <RightBar />
            </div>
          </div>

          <div className="lg:hidden">
            <RightBar />
          </div>
        </div>

        <div className="hidden lg:block">
          <RightMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
