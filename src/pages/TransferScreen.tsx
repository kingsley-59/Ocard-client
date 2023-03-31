import { useState, useEffect } from 'react'
import { BsBank, BsPlus } from 'react-icons/bs';
import { usePaystackPayment } from 'react-paystack'
import { PaystackProps } from 'react-paystack/dist/types';
import config from '../config';


const User: {firstName: string, lastName: string, email: string, phoneNumber: string} = {
    firstName: 'Jesse',
    lastName: 'Jackson',
    email: 'jjackson@mail.com',
    phoneNumber: '09123456789'
};

export default function TransferScreen() {
    const [accountName, setAccountName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [bankName, setBankName] = useState<string>('')
    const [availableBanks, setAvailableBanks] = useState<Array<object>>([]);

    const [cards, setCards] = useState<{ name: String, bin: String, last4: String }[]>([])
    const [activeCard, setActiveCard] = useState<{ name: String, bin: String, last4: String } | null>();

    const paystackConfig: PaystackProps = {
        email: User.email,
        amount: 50 * 100,
        publicKey: config.publicKey,
        firstname: User.firstName, 
        lastname: User.lastName, 
        phone: User.phoneNumber
    }
    const onSuccess = (...args: any[]) => {
        const response = args[0];
        console.log(response);
    }
    const onClose = () => {
        console.log('closed.');
    }
    const initializePayment = usePaystackPayment(paystackConfig);

    useEffect(() => {
        setCards([
            { name: 'Sterling bank', bin: '123456', last4: '9876' },
            { name: 'First bank', bin: '523456', last4: '9896' },
        ]);
        async function fetchBanks() {
            const response = await fetch('localhost:3000/banks.json');
            const data = await response.json();
            setAvailableBanks(data?.banks || []);
        }
        fetchBanks();
    }, []);
    return (
        <div className="container mx-auto px-5 py-6 flex flex-col gap-4">
            <div className="flex flex-row justify-start font-thin text-2xl italic py-3">
                Transfers are fast and seamless!
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-3">
                <div className="w-full my-auto flex flex-col items-start gap-3">
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="accountName">Account number</label>
                        <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className='w-full border-2 p-2 border-gray rounded-lg placeholder:italic placeholder:text-blue-400 placeholder:text-sm' id='accountName' placeholder='0000000000' />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="acctbank">Bank</label>
                        <input type="text" list='banklist' value={bankName} onChange={e => setBankName(e.target.value)} className='w-full border-2 p-2 border-gray rounded-lg placeholder:italic placeholder:text-blue-400 placeholder:text-sm' id='acctbank' placeholder='Start typing...' />
                        <datalist id='banklist'>
                            {availableBanks?.map((bank, idx) => (
                                <option key={idx} value="bank"></option>
                            ))}
                        </datalist>
                    </div>

                </div>
                <div className="w-full md:min-h-[180px] flex flex-row justify-center items-center bg-gray rounded-xl p-4">
                    {accountName ? (
                        <span className="font-medium">{accountName}</span>
                    ) : (
                        <span className="font-medium">Account information will appear here.</span>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-start">
                <div className="w-full flex flex-col gap-3">
                    <div className="font-light italic">Transfer from:</div>
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex flex-row gap-3 border border-gray-light rounded-xl p-3" onClick={() => setActiveCard(card)} style={{ borderColor: card.bin === activeCard?.bin ? '#058A72' : '' }}>
                            <div className="rounded-full flex justify-center items-center h-[50px] max-h-full aspect-square border p-3"><BsBank size={'auto'} /> </div>
                            <div className="flex flex-col gap-2 items-start">
                                <div className="">{card.name}</div>
                                <div className="text-blue-300">{card.bin}******{card.last4}</div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-center items-center gap-2 border-2 border-gray-dark border-dashed rounded-xl p-[10px]  cursor-pointer" onClick={() => initializePayment(onSuccess, onClose)}>
                        <div className=""><BsPlus size={30} /> </div>
                        <div className="italic" >
                            Add payment option
                        </div>
                    </div>
                </div>
                <div className="w-full py-2">
                    <button className='w-full py-[10px] rounded-lg text-white bg-blue'>Transfer {'NGN7000'}</button>
                </div>
            </div>
        </div>
    )
}
