import React, { useState } from "react";
import UserInfoTab from "../components/ProfileTab/UserInfoTab";
import AddressTab from "../components/ProfileTab/AddressTab";

const Profile = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="mx-auto max-w-6xl px-6 xl:px-0 mt-16">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-lg font-normal text-center"
          id="default-styled-tab"
          data-tabs-toggle="#default-styled-tab-content"
          data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
          data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary ${
                tab === 0 ? "text-primary border-primary font-bold" : ""
              }`}
              id="profile-styled-tab"
              data-tabs-target="#styled-profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => setTab(0)}
            >
              Thông tin tài khoản
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary ${
                tab === 1 ? "text-primary border-primary font-bold" : ""
              }`}
              id="dashboard-styled-tab"
              data-tabs-target="#styled-dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
              onClick={() => setTab(1)}
            >
              Đơn hàng
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary ${
                tab === 2 ? "text-primary border-primary font-bold" : ""
              }`}
              id="settings-styled-tab"
              data-tabs-target="#styled-settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
              onClick={() => setTab(2)}
            >
              Sổ địa chỉ
            </button>
          </li>
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {tab === 0 && <UserInfoTab />}
        {tab === 1 && (
          <div
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="styled-dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
        )}
        {tab === 2 && <AddressTab />}
        {tab === 3 && (
          <div
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="styled-contacts"
            role="tabpanel"
            aria-labelledby="contacts-tab"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Contacts tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
