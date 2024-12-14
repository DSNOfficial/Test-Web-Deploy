import React from "react";
import { Line, Bar } from "@ant-design/charts";
import ViewerCount from "./ViewerCountPage";

const HomePage = () => {
  // Sample data for analysis bar chart
  const analysisData = [
    {
      metric: "Metric 1",
      value: 100,
    },
    {
      metric: "Metric 2",
      value: 200,
    },
    // Add more data as needed
  ];

  // Sample data for viewer chart
  const viewerData = [
    { day: "Monday", views: 120 },
    { day: "Tuesday", views: 200 },
    { day: "Wednesday", views: 150 },
    { day: "Thursday", views: 220 },
    { day: "Friday", views: 180 },
    { day: "Saturday", views: 280 },
    { day: "Sunday", views: 300 },
  ];

  // Configuration for viewer chart
  const viewerConfig = {
    data: viewerData,
    xField: "day",
    yField: "views",
    height: 400,
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  // Configuration for analysis bar chart
  const analysisConfig = {
    data: analysisData,
    xField: 'metric',
    yField: 'value',
    height: 400,
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      metric: { alias: 'Metric' },
      value: { alias: 'Value' },
    },
  };

  // Sample data for SEO graph (dummy data)
  const seoData = [
    { month: "Jan", seoScore: 80 },
    { month: "Feb", seoScore: 85 },
    { month: "Mar", seoScore: 90 },
    { month: "Apr", seoScore: 88 },
    { month: "May", seoScore: 92 },
    { month: "Jun", seoScore: 95 },
  ];

  // Configuration for SEO graph
  const seoConfig = {
    data: seoData,
    xField: "month",
    yField: "seoScore",
    height: 400,
    point: {
      size: 5,
      shape: "circle",
    },
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
      {/* Left Column: Viewer Graph */}
      <div>
        <h1>ចំនួនទស្សនា</h1>
        <ViewerCount />
      </div>
      
      {/* Center Column: SEO Graph */}
      <div>
        <h1>ចំនួន SEO</h1>
        <Line {...seoConfig} />
      </div>

      {/* Right Column: Post Analysis Graph */}
      <div>
        <h1>វិភាគទិន្នន័យ </h1>
        <Bar {...analysisConfig} />
      </div>
    </div>
  );
};

export default HomePage;
