

export default function RecentTransactions() {
    return (
        <div className="w-full flex flex-col gap-3 p-3">
            <div className="flex flex-row items-center text-[20px] font-medium py-3">
                Recent Transactions
            </div>
            <div className="flex flex-col gap-2">
                {[...Array(5)].map((val, idx) => (
                    <div key={idx} className="flex flex-row items-center justify-between rounded-lg border-t-[1px] border-gray p-2">
                        <div className="flex flex-row items-center justify-start gap-2">
                            <div className="w-[35px] h-[40px] flex items-center justify-center bg-blue text-white rounded">
                                <span className="font-medium text-2xl font-brand">T</span>
                            </div>
                            <div className="grid">
                                <span className="">Transfer to Marvin</span>
                                <span className="text-blue text-opacity-70 text-sm">Mar 24, 2023</span>
                            </div>
                        </div>
                        <div className="font-medium text-xl">6500</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
