import React from "react";

interface ChartsHeaderProps {
  title: string;
  category?: string;
}

const ChartsHeader: React.FC<ChartsHeaderProps> = ({ category, title }) => (
  <div className=" mb-10">
    <div>
      <p className="text-lg text-gray-400">Graph</p>
      <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">
        {title}
      </p>
    </div>
    <p className="text-center dark:text-gray-200 text-xl mb-2 mt-3">{category}</p>
  </div>
);

export default ChartsHeader;
