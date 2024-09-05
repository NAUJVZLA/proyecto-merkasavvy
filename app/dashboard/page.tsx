'use client'
import React, { useState } from 'react';
import { PlusCircle, List, BarChart2 } from 'lucide-react';

const Dashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState('create');

    const menuItems = [
        { key: 'create', icon: <PlusCircle className="w-5 h-5" />, label: 'Create List' },
        { key: 'view', icon: <List className="w-5 h-5" />, label: 'View Lists' },
        { key: 'summary', icon: <BarChart2 className="w-5 h-5" />, label: 'Purchase Summary' },
    ];

    const renderContent = () => {
        switch (selectedMenu) {
            case 'create':
                return <h2 className="text-2xl font-bold">Create New List</h2>;
            case 'view':
                return <h2 className="text-2xl font-bold">View Your Lists</h2>;
            case 'summary':
                return <h2 className="text-2xl font-bold">Purchase Summary</h2>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-indigo-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">MerkaSavvy</div>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded">
                    Logout
                </button>
            </header>
            <div className="flex flex-1">
                <aside className="w-64 bg-white border-r">
                    <nav className="mt-5">
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.key} className="mb-2">
                                    <button
                                        onClick={() => setSelectedMenu(item.key)}
                                        className={`w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${selectedMenu === item.key ? 'bg-gray-100' : ''
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 bg-gray-100 p-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        {renderContent()}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-green-400 text-white p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Total Lists</h3>
                                <p className="text-3xl font-bold mt-2">5</p>
                            </div>
                            <div className="bg-blue-400 text-white p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Items Purchased</h3>
                                <p className="text-3xl font-bold mt-2">42</p>
                            </div>
                            <div className="bg-red-400 text-white p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Total Spent</h3>
                                <p className="text-3xl font-bold mt-2">$367.50</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;