import { useState, useEffect } from 'react'
import { BsBank, BsPlus, BsCreditCard } from 'react-icons/bs';
import { usePaystackPayment } from 'react-paystack'
import { PaystackProps } from 'react-paystack/dist/types';
import config from '../config';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Card = { name: String, bin: String, last4: String, auth_code: string }
const User: { firstName: string, lastName: string, email: string, phoneNumber: string } = {
    firstName: 'Kingsley',
    lastName: 'Akahibe',
    email: 'divine10646@mail.com',
    phoneNumber: '08141971579'
};

const { apiUrl } = config;

export default function TransferScreen() {
    const [amount, setAmount] = useState<number>();
    const [accountName, setAccountName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [bankCode, setBankCode] = useState<string>('')
    const [availableBanks, setAvailableBanks] = useState<Array<{ name: string, slug: string, code: string }>>([]);

    const [cards, setCards] = useState<Card[]>([])
    const [activeCard, setActiveCard] = useState<Card | null>();
    const [payWithNewCard, setPayWithNewCard] = useState<Boolean>(false);

    const [resolveAcctError, setResolveAcctError] = useState<string>('');

    const paystackConfig: PaystackProps = {
        email: User.email,
        amount: 50 * 100,
        publicKey: config.publicKey,
        firstname: User.firstName,
        lastname: User.lastName,
        phone: User.phoneNumber
    }
    const onSuccess = (...args: any[]) => {
        const reference = args[0]?.reference;

        async function verifyTransaction() {
            try {
                const response = await axios.get(`${apiUrl}/payments/verify/${reference}`);
                const { message, data } = response.data;
                toast.success(message);
                const { authorization } = data || {};
                const { bin, last4, bank, authorization_code, reusable } = authorization || {};
                if (!reusable) {
                    toast.warn('You card is not reusable. Please use another card.');
                    return;
                }
                setCards(prev => [...prev, { bin, last4, name: bank, auth_code: authorization_code }]);
            } catch (error: any) {
                toast.error(error?.message);
            }
        }
        verifyTransaction();
    }
    const onClose = () => {
        console.log('closed.');
    }
    const initializePayment = usePaystackPayment(paystackConfig);

    useEffect(() => {
        if (accountNumber.length !== 10 || !bankCode) {
            setResolveAcctError('');
            return
        };

        async function resolveAccount() {
            try {
                const response = await axios.post(`${apiUrl}/banks/resolve`, { accountNumber, bankCode })
                const { data } = response.data;
                console.log(data);
                setAccountName(data?.account_name);
            } catch (error: any) {
                setResolveAcctError(error?.message);
            }
        }
        resolveAccount();
    }, [accountNumber, bankCode]);

    useEffect(() => {
        async function fetchBanks() {
            try {
                const response = await fetch(config.apiUrl + '/banks.json');
                const data = await response.json();
                setAvailableBanks(data?.banks);
            } catch (error: any) {
                alert(error?.message);
            }
        }
        fetchBanks();
    }, []);

    const handleTransfer = async () => {
        async function initiateTransfer(reference = '') {
            const payload: any = {
                account_name: accountName,
                account_number: accountNumber,
                bank_code: bankCode,
                email: User.email,
                amount: Number(amount) * 100,
            }
            payWithNewCard ? payload.ref_code = reference : payload.authorization_code = activeCard?.auth_code
           
            try {
                const response = await axios.post(`${apiUrl}/payments/initiate-transfer`, payload);
                const { message, data } = response.data;
                console.log(data);
                toast.success(message);
            } catch (error: any) {
                console.log(error);
                const errorMsg = error?.response?.data?.error || error?.response?.data;
                toast.error(errorMsg || error?.message);
            }
        }

        if (payWithNewCard) {
            initializePayment((...args: any[]) => {
                const reference = args[0]?.reference;
                initiateTransfer(reference);
            }, onClose);
        } else if (activeCard?.auth_code) {
            initiateTransfer();
        } else {
            toast.warning('You have to select a payment method');
        }
    }

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
                        <label htmlFor="selectBank">Bank</label>
                        <select value={bankCode} onChange={e => setBankCode(e.target.value)} className='w-full border-2 p-2 border-gray rounded-lg placeholder:italic placeholder:text-blue-400 placeholder:text-sm' id='selectBank'>
                            <option value="">Select bank</option>
                            {availableBanks?.map((bank, idx) => (
                                <option key={idx} value={bank.code} className='py-3 text-blue'>{bank.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="w-full md:min-h-[180px] flex flex-row justify-center items-center bg-gray rounded-xl p-4">
                    {accountName ? (
                        <span className="font-medium">{accountName}</span>
                    ) : resolveAcctError ? (
                        <span className="text-orange">{resolveAcctError}</span>
                    ) : (
                        <span className="font-medium">Account information will appear here.</span>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-start">
                <div className="w-full flex flex-col gap-3">
                    <label htmlFor="amount11">Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value as unknown as number)} id="amount11" className='w-full border-2 p-2 border-gray rounded-lg placeholder:italic placeholder:text-blue-400 placeholder:text-sm' placeholder='at least NGN50' />
                    <div className="font-light italic">Transfer from:</div>
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex flex-row gap-3 border border-gray-light rounded-xl p-3" onClick={() => {setPayWithNewCard(false); setActiveCard(card)}} style={{ borderColor: card.bin === activeCard?.bin ? '#058A72' : '' }}>
                            <div className="rounded-full flex justify-center items-center h-[50px] max-h-full aspect-square border p-3"><BsBank size={'auto'} /> </div>
                            <div className="flex flex-col gap-2 items-start">
                                <div className="">{card.name}</div>
                                <div className="text-blue-300">{card.bin}******{card.last4}</div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row gap-3 border border-gray-light rounded-xl p-3" onClick={() => {setPayWithNewCard(true); setActiveCard(null)}} style={{ borderColor: payWithNewCard ? '#058A72' : '' }} >
                        <div className="rounded-full flex justify-center items-center h-[50px] max-h-full aspect-square border p-3"><BsCreditCard size={'auto'} /> </div>
                        <div className="">Pay with card</div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 border-2 border-gray-dark border-dashed rounded-xl p-[10px]  cursor-pointer" onClick={() => initializePayment(onSuccess, onClose)}>
                        <div className=""><BsPlus size={30} /> </div>
                        <div className="italic" >
                            Add payment card
                        </div>
                    </div>
                </div>
                <div className="w-full py-2">
                    <button onClick={handleTransfer} className='w-full py-[10px] rounded-lg text-white bg-blue disabled:bg-opacity-20' disabled={isNaN(amount as number) || Number(amount) < 50 || !accountName}>
                        {payWithNewCard ? 'Transfer with card' : 'Transfer'} - {amount && `NGN${amount}`}
                    </button>
                </div>
            </div>
        </div>
    )
}
