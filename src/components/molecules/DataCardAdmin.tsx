import React from 'react';

interface DataItem {
  icon: string;
  label: string;
  value: string | number;
  priceIcon?: JSX.Element;
}

interface DataCardAdminProps {
  data: DataItem[];
  title: string;
  style?: string;
}

const DataCardAdmin = ({ data, title, style }: DataCardAdminProps) => {
  return (
    <div className={`flex flex-col gap-4 bg-white p-4 rounded-md shadow-md ${style}`}>
      <h2 className="font-medium text-xl">{title}</h2>
      <div className="flex justify-between gap-4">
        {data?.map((item, index) => (
          <div
            key={index}
            className={`w-full flex flex-col items-center gap-4 pr-4 ${index < data.length - 1 && 'border-r border-gray-300'}`}
          >
            <img src={item.icon} width={35} alt="icons" />
            <div className="w-full flex justify-between items-end gap-2 p-1">
              <div className="flex items-center">
                {item.priceIcon}
                <h3 className="font-semibold text-2xl">{item.value}</h3>
              </div>
              <p className="font-semibold text-lg text-gray-700">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCardAdmin;
