import RecentTransactions from "./RecentTransactions"

export default function Rightbar() {
  return (
    <div className="w-full lg:max-w-[290px] xl:max-w-sm p-5 bg-white border-x-[1px] border-gray hidden lg:block">
        <RecentTransactions />
    </div>
  )
}
