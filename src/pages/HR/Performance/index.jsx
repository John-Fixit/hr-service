/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from "./DoughnutChart";
import LineChartComponent from "./LineChartComponent";
import Header from "./Header";
import TopCards from "./TopCards";
import { Select, SelectItem } from "@nextui-org/react";
import { top3_performance, individual_performance, count_data, performers } from "./data";
import { Tab, Tabs } from "@nextui-org/react";
import TopPerformerTable from "./TopPerformerTable";
import IndividualPerformanceTable from "./IndividualPerformanceTable";
import Separator from "../../../components/payroll_components/Separator";
import CountTable from "./CountTable";
Chart.register(CategoryScale);

const HrPerformance = () => {
  const [trafficTab, setTrafficTab] = useState("totalKpis");
  const [trafficData, setTrafficData] = useState([
    { name: "JAN", amount: 10 },
    { name: "FEB", amount: 2 },
    { name: "MAR", amount: 5 },
    { name: "APR", amount: 15 },
    { name: "MAY", amount: 10 },
    { name: "JUN", amount: 12 },
    { name: "JUL", amount: 15 },
    { name: "AUG", amount: 25 },
    { name: "SEPT", amount: 22 },
    { name: "OCT", amount: 30 },
    { name: "NOV", amount: 25 },
    { name: "DEC", amount: 40 },
  ]);
  const [currentTab, setCurrentTab] = useState("traffic");
  const [DoughnutData, setDoughnutData] = useState([35, 25, 40]);

  // Selecting the region on map
  const mapRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState("US");

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);

    if (mapRef.current) {
      // console.log(mapRef.current);
      mapRef.current.setSelectedRegions([regionCode]);
    }
  };

  const selectTab = (tab) => {
    setTrafficTab(tab);
    if (tab === "totalKpis") {
      setTrafficData([
        { name: "JAN", amount: 10 },
        { name: "FEB", amount: 2 },
        { name: "MAR", amount: 5 },
        { name: "APR", amount: 15 },
        { name: "MAY", amount: 10 },
        { name: "JUN", amount: 12 },
        { name: "JUL", amount: 15 },
        { name: "AUG", amount: 25 },
        { name: "SEPT", amount: 22 },
        { name: "OCT", amount: 30 },
        { name: "NOV", amount: 25 },
        { name: "DEC", amount: 40 },
      ]);
    } else {
      setTrafficData([
        { name: "JAN", amount: 7 },
        { name: "FEB", amount: 35 },
        { name: "MAR", amount: 12 },
        { name: "APR", amount: 27 },
        { name: "MAY", amount: 34 },
        { name: "JUN", amount: 17 },
        { name: "JUL", amount: 19 },
        { name: "AUG", amount: 30 },
        { name: "SEPT", amount: 28 },
        { name: "OCT", amount: 32 },
        { name: "NOV", amount: 24 },
        { name: "DEC", amount: 49 },
      ]);
    }
  };

  const tab = (recentTab) => {
    setCurrentTab(recentTab);
    if (recentTab === "purchase") {
      setDoughnutData([60, 30, 10]);
    } else if (recentTab === "quotes") {
      setDoughnutData([30, 50, 20]);
    } else {
      setDoughnutData([35, 25, 40]);
    }
  };

  const data = [
    { name: "SUN", value: 400 },
    { name: "MON", value: 200 },
    { name: "TUE", value: 450 },
    { name: "WED", value: 460 },
    { name: "THUR", value: 220 },
    { name: "FRI", value: 380 },
    { name: "SAT", value: 800 },
  ];

  const data2 = [
    { name: "JAN", amount: 10 },
    { name: "FEB", amount: 2 },
    { name: "MAR", amount: 5 },











    
    { name: "APR", amount: 15 },
    { name: "MAY", amount: 10 },
    { name: "JUN", amount: 12 },
    { name: "JUL", amount: 15 },
    { name: "AUG", amount: 25 },
    { name: "SEPT", amount: 22 },
    { name: "OCT", amount: 30 },
    { name: "NOV", amount: 25 },
    { name: "DEC", amount: 40 },
  ];

  let tabs = [
    {
      id: "top3_performer",
      label: "Top 3 Performer",
      content: "memos",
    },
    {
      id: "bottom3_performer",
      label: "Bottom 3 Performer",
      content: "templates",
    },
    {
      id: "all_performer",
      label: "All Performers",
      content: "templates",
    },
  ];

  let count_tabs = [
    {
      id: "requiring_training",
      label: "Requiring Training",
      content: "Requiring Training",
    },
    {
      id: "promotion",
      label: "Requiring Promotion",
      content: "Requiring Promotion",
    }
  ];

  const handleTabChange = (item) => {};

  return (
    <Fragment>
      <section className="header_dashboard_section flex ">
      <Header />
      </section>
      <div className="mt-5">
        <hr />
      </div>
      <>
        <TopCards />
      </>
      <div className="filter_section">
        <div className="bg-white shadow rounded">
          <p className=" border-b px-4 my-2 py-2 text-medium font-semibold font-Exotic">
            Filter By:
          </p>
          <div className="px-4 py-2 flex">
            <Select
              size="sm"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Select"
              className="rounded-sm w-48 bg-transparent"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            >
              {[
                { label: "This year" },
                { label: "This Quarter" },
                { label: "This month" },
                { label: "Company" },
                { label: "Department" },
                { label: "Team" },
              ].map((item, i) => (
                <SelectItem key={i} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <input
              type="search"
              name=""
              id=""
              className={` outline-none border border-1 rounded bg-transparent md:w-60 px-2 w-full 
              placeholder:text-[0.80rem] transition-all duration-700 placeholder:text-sidebarInptextColor text-gray-500`}
              placeholder={`filter by`}
            />
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 font-Lato xl:grid-cols-4">
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-2 items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            height="35px"
            width="35px"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#D4D5D6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <div className="flex gap-4 items-center">
            <h4 className="text-2xl font-bold">3.6k</h4>
            <div>
              <strong className="text-black text-semibold">Visits</strong>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">31.5%</p>
                <svg
                  fill="#00BCC2"
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.01 512.01"
                  xmlSpace="preserve"
                  className="cursor-pointer"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M505.755,358.256L271.088,123.589c-8.341-8.341-21.824-8.341-30.165,0L6.256,358.256c-8.341,8.341-8.341,21.824,0,30.165 s21.824,8.341,30.165,0l219.584-219.584l219.584,219.584c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251 C514.096,380.08,514.096,366.597,505.755,358.256z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-2 items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            role="img"
            height="35px"
            width="35px"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="dolarIconTitle"
            stroke="#D4D5D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            color="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title id="dolarIconTitle">Dolar</title>{" "}
              <path d="M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16"></path>{" "}
            </g>
          </svg>
          <div className="flex gap-4 items-center ">
            <h4 className="text-2xl font-bold">$12.3k</h4>
            <div>
              <strong className="text-black text-semibold">Sales</strong>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">51.5%</p>
                <svg
                  fill="#00BCC2"
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.01 512.01"
                  xmlSpace="preserve"
                  className="cursor-pointer"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M505.755,358.256L271.088,123.589c-8.341-8.341-21.824-8.341-30.165,0L6.256,358.256c-8.341,8.341-8.341,21.824,0,30.165 s21.824,8.341,30.165,0l219.584-219.584l219.584,219.584c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251 C514.096,380.08,514.096,366.597,505.755,358.256z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center gap-2">
          <div className="flex gap-4 items-center">
            <h4 className="text-2xl font-bold">$8.3k</h4>
            <div>
              <strong className="text-black text-semibold">Products</strong>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">31.5%</p>
                <svg
                  fill="#00BCC2"
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.01 512.01"
                  xmlSpace="preserve"
                  className="cursor-pointer"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M505.755,358.256L271.088,123.589c-8.341-8.341-21.824-8.341-30.165,0L6.256,358.256c-8.341,8.341-8.341,21.824,0,30.165 s21.824,8.341,30.165,0l219.584-219.584l219.584,219.584c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251 C514.096,380.08,514.096,366.597,505.755,358.256z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <LineChart width={200} height={80} data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              dot={false}
              activeDot={false}
              strokeWidth={"2.5px"}
              stroke="#2196F3"
            />
          </LineChart>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center gap-2">
          <div className="flex gap-4 items-center">
            <h4 className="text-2xl font-bold">$15.0k</h4>
            <div>
              <strong className="text-black text-semibold">Courses</strong>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">31.5%</p>
                <svg
                  fill="#00BCC2"
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.01 512.01"
                  xmlSpace="preserve"
                  className="cursor-pointer"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M505.755,358.256L271.088,123.589c-8.341-8.341-21.824-8.341-30.165,0L6.256,358.256c-8.341,8.341-8.341,21.824,0,30.165 s21.824,8.341,30.165,0l219.584-219.584l219.584,219.584c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251 C514.096,380.08,514.096,366.597,505.755,358.256z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <LineChart width={220} height={80} data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              dot={false}
              activeDot={false}
              stroke="#00BCC2"
              strokeWidth={"2.5px"}
            />
          </LineChart>
        </div>
      </div> */}

      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4">
          <div className="DoughnutChart bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200">
              <nav
                className="-mb-px flex gap-6 justify-center my-4"
                aria-label="Tabs"
              >
                <h4 className="text-medium font-semibold tracking-wider mb-1">Total KPIs</h4>
              </nav>
            </div>
            <DoughnutChart DoughnutData={DoughnutData} />
          </div>
        </div>
        <div className="lineChart cols-span-2 bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex gap-6 justify-center my-4"
              aria-label="Tabs"
            >
              <h4 className="text-medium font-semibold tracking-wider mb-1">Total Pending</h4>
            </nav>
          </div>

          <LineChartComponent trafficData={trafficData} />
        </div>
      </div>

      {/* <div className="py-8 grid grid-cols-1 md:grid-cols-1 gap-4 ">
        <div className="lineChart cols-span-2 bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav
              className="grid grid-cols-2 h-[4rem] cursor-pointer bg-[#F5F7FA]"
              aria-label="Tabs"
            >
              <div
                className={`flex transition-all flex-col items-center justify-center ${
                  trafficTab === "totalKpis"
                    ? "border-t-[3px] border-t-sky-500 bg-white text-black"
                    : "text-gray-500 border"
                }`}
                onClick={() => selectTab("totalKpis")}
              >
                <h4 className="text-medium font-semibold">Total KPIs</h4>
              </div>
              <div
                className={`flex flex-col items-center justify-center ${
                  trafficTab === "totalPending"
                    ? "border-t-[3px] border-sky-500 bg-white text-black"
                    : "text-gray-500 border"
                }`}
                onClick={() => selectTab("totalPending")}
              >
                <h4 className="text-medium font-semibold">Total Pending</h4>
              </div>
            </nav>
          </div>

          <LineChartComponent trafficData={trafficData} />
        </div>
      </div> */}

      <div className="flex w-full flex-col pb-10">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          color="primary"
          variant="underlined"
          fullWidth={true}
          onSelectionChange={handleTabChange}
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            // tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label} className="px-0">
              <TopPerformerTable rows={item?.id==='top3_performer'? performers?.slice(0, 3): item?.id==='bottom3_performer' ? performers?.slice(-3) : performers} />
            </Tab>
          )}
        </Tabs>
      </div>





        
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Dynamic tabs"
          items={count_tabs}
          color="primary"
          variant="underlined"
          fullWidth={true}
          onSelectionChange={handleTabChange}
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            // tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label} className="px-0 font-medium font-Exotic text-base leading-3">
               <CountTable rows={item?.id==='requiring_training'?performers?.slice(0, 30) : item?.id==="promotion"&&performers?.slice(-10)} />
            </Tab>
          )}
        </Tabs>
      </div>









      <div className="flex w-full flex-col">
            <Separator separator_text={"Individual Historical Performance"}/>
            <IndividualPerformanceTable rows={individual_performance} />
        </div>
    </Fragment>
  );
};

export default HrPerformance;
