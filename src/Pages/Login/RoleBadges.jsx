// src/pages/Login/RoleBadges.jsx
import React from 'react'

const ROLES = [
    {
        key: 'doctor',
        label: 'Doctor',
        hint: 'Medical staff',
        icon: '🩺',
        credentials: { email: 'doctor11@example.com', password: 'hello123' },
        activeClass: 'border-primaryColor bg-blue-50',
        checkClass: 'bg-primaryColor border-primaryColor',
        iconBg: 'bg-blue-50',
    },
    {
        key: 'patient',
        label: 'Patient',
        hint: 'Your health',
        icon: '🏥',
        credentials: { email: 'developer@example.com', password: 'hello123' },
        activeClass: 'border-emerald-500 bg-emerald-50',
        checkClass: 'bg-emerald-500 border-emerald-500',
        iconBg: 'bg-emerald-50',
        labelColor: 'text-emerald-600',
    },
]

const RoleBadges = ({ activeRole, onSelect }) => {
    const activeRoleData = ROLES.find((r) => r.key === activeRole)

    return (
        <div className="mb-6">
            <p className="text-[11px] font-semibold text-textColor uppercase tracking-widest mb-2">
                Quick Login As
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
                {ROLES.map((role) => {
                    const isActive = activeRole === role.key
                    return (
                        <button
                            key={role.key}
                            type="button"
                            onClick={() => onSelect(role.key, role.credentials)}
                            className={`flex items-center gap-3 border-2 rounded-xl p-3 transition-all duration-200 text-left
                ${isActive ? role.activeClass : 'border-[#e5e7eb] bg-white hover:border-primaryColor hover:bg-blue-50'}`}
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${role.iconBg}`}>
                                {role.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-headingColor leading-none mb-0.5">
                                    {role.label}
                                </p>
                                <p className="text-[11px] text-textColor">{role.hint}</p>
                            </div>
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${isActive ? role.checkClass : 'border-gray-300'}`}
                            >
                                {isActive && (
                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Credentials hint pill */}
            {activeRoleData && (
                <div className="text-[11px] text-textColor bg-gray-50 border border-[#e5e7eb] rounded-lg px-3 py-2 leading-relaxed">
                    <span className="font-semibold text-headingColor">
                        {activeRoleData.icon} {activeRoleData.label}
                    </span>{' '}
                    credentials auto-filled. Click <span className="font-semibold">Log In</span> to continue.
                </div>
            )}
        </div>
    )
}

export default RoleBadges