/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
    Settings, 
    Globe, 
    Shield, 
    Database, 
    Server, 
    Cpu, 
    HardDrive,
    Activity,
    Info,
    Layout,
    Type,
    CheckCircle2
} from 'lucide-react';
import useAuth from '../../context/useAuth';
import { adminService } from '../../api/adminService';

const InfoCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 border border-slate-100 flex items-center group hover:border-red-700 transition-all duration-500">
        <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-700 group-hover:text-white transition-all duration-500 mr-6">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{value}</p>
        </div>
    </div>
);

const AdminSettings = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const systemInfo = [
        { title: 'Environment', value: 'Production Alpha', icon: Globe },
        { title: 'Base Version', value: 'Nexora v2.4.0', icon: Database },
        { title: 'Server Status', value: 'Optimal (24ms Latency)', icon: Server },
        { title: 'Core Processor', value: 'Node.js 20.x', icon: Cpu },
        { title: 'Storage Provider', value: 'MongoDB Atlas', icon: HardDrive },
        { title: 'Security Protocol', value: 'JWT + SHA-256', icon: Shield },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <header className="mb-12">
                <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4">Core Configuration</p>
                <h1 className="text-5xl md:text-6xl font-black font-serif text-slate-900 tracking-tighter leading-none mb-4">
                    Network Settings
                </h1>
                <p className="text-lg font-serif text-slate-500">Global website information and system telemetry.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {/* System Overview */}
                    <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                        <div className="flex items-center mb-10">
                            <Activity className="text-red-700 mr-4" size={24} />
                            <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">System Telemetry</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {systemInfo.map((info, i) => (
                                <InfoCard key={i} {...info} />
                            ))}
                        </div>
                    </div>

                    {/* Branding Info */}
                    <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                        <div className="flex items-center mb-10">
                            <Layout className="text-red-700 mr-4" size={24} />
                            <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">Branding & Identity</h3>
                        </div>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 block">Publication Name</label>
                                    <div className="bg-slate-50 p-4 font-serif font-black text-2xl text-slate-900">Nexora News</div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 block">Network Domain</label>
                                    <div className="bg-slate-50 p-4 font-bold text-sm text-slate-900">nexoranews.dpdns.org</div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 block">Global Editorial Slogan</label>
                                <div className="bg-slate-50 p-4 font-medium text-slate-600 border-l-4 border-red-700">
                                    "Prestige journalism for the modern digital evolution."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Admin Profile Quick View */}
                    <div className="bg-slate-900 text-white p-8">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-red-700 flex items-center justify-center mr-4">
                                <span className="font-serif font-black text-xl">N</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Nexora Admin</h4>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Identity Verified</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/10 flex items-center justify-center mr-4 rounded-full">
                                    <CheckCircle2 size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database Status</p>
                                    <p className="text-[11px] font-bold uppercase tracking-tight">Synchronized</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="bg-white border border-slate-100 p-8 shadow-sm">
                        <div className="flex items-center mb-6">
                            <Info className="text-slate-300 mr-3" size={16} />
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Network Impact</h4>
                        </div>
                        {!loading && stats && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Intel Volumes</span>
                                    <span className="text-xl font-serif font-black text-slate-900">{stats.totalArticles}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Reach</span>
                                    <span className="text-xl font-serif font-black text-slate-900">{stats.totalViews}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Personnel Count</span>
                                    <span className="text-xl font-serif font-black text-slate-900">12</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
