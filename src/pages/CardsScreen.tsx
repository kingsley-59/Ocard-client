import { useState, useEffect } from 'react'
import { BsBank, BsPlus, BsCreditCard } from 'react-icons/bs';
import { BiLoaderCircle, BiArrowBack } from 'react-icons/bi'
import { usePaystackPayment } from 'react-paystack'
import { PaystackProps } from 'react-paystack/dist/types';
import config from '../config';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type Card = { name: String, bin: String, last4: String, auth_code: string }
const User: { firstName: string, lastName: string, email: string, phoneNumber: string } = {
    firstName: 'Kingsley',
    lastName: 'Akahibe',
    email: 'divine10646@mail.com',
    phoneNumber: '08141971579'
};

const { apiUrl } = config;

const PaystackDefaultConfig: PaystackProps = {
    email: User.email,
    amount: 50 * 100,
    publicKey: config.publicKey,
    firstname: User.firstName,
    lastname: User.lastName,
    phone: User.phoneNumber
};


export default function CardsScreen() {
    const [cards, setCards] = useState<Card[]>([])
    const [activeCard, setActiveCard] = useState<Card | null>();

    // loading states
    const [addCardLoading, setAddCardLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    
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
    const initializePayment = usePaystackPayment(PaystackDefaultConfig);


    useEffect(() => {
        setCards([
            { name: 'First bank', bin: '123456', last4: '0789', auth_code: 'AUTH_wdjh2ih' },
            { name: 'Sterling bank', bin: '526381', last4: '9928', auth_code: 'AUTH_wdjh2ih' },
        ]);
    }, []);

    const handleAddCard = async () => {
        setAddCardLoading(true)
        setTimeout(() => {
            initializePayment(onSuccess, onClose)
            setAddCardLoading(false)
        }, 1500);
    }

    return (
        <div className="container mx-auto px-5 py-6 flex flex-col gap-4">
            <div className="flex flex-row justify-start gap-4 text-2xl py-3">
                <div className='cursor-pointer flex flex-row items-center hover:bg-gray-light transition-all' onClick={() => navigate(-1)}> <BiArrowBack/> </div>
                <div>Manage Cards</div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-3">
                
            </div>
            <div className="flex flex-col justify-start">
                <div className="w-full flex flex-col gap-3">
                    
                    <div className="font-light italic">Available cards:</div>
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex flex-row gap-3 border border-gray-light rounded-xl p-3" onClick={() => setActiveCard(card)} style={{ borderColor: card.bin === activeCard?.bin ? '#058A72' : '' }}>
                            <div className="rounded-full flex justify-center items-center h-[50px] max-h-full aspect-square border p-3"><BsCreditCard size={'auto'} /> </div>
                            <div className="flex flex-col gap-2 items-start">
                                <div className="">{card.name}</div>
                                <div className="text-blue-300">{card.bin}******{card.last4}</div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-center items-center gap-2 border-2 border-gray-dark border-dashed rounded-xl p-[10px]  cursor-pointer" onClick={handleAddCard}>
                        <div className=""><BsPlus size={30} /> </div>
                        <div className="italic flex flex-row items-center flex-nowrap gap-4" >
                            Add payment card {addCardLoading && (<BiLoaderCircle id='loader' />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
