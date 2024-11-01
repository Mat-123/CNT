import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const EditTransaction = ({ isOpen, onClose, transaction }) => {
    const { id_crypto } = useParams();
    const [formData, setFormData] = useState({
        quantity: '',
        transaction_price: '',
        total_spent: '',
        transaction_date: '',
        wallet: '',
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                quantity: transaction.quantity,
                transaction_price: transaction.transaction_price,
                total_spent: transaction.total_spent,
                transaction_date: transaction.transaction_date,
                wallet: transaction.wallet || '',
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const dataToSend = {
                ...formData,
                id_crypto: parseInt(id_crypto, 10),
            id: transaction.id
            };
            const response = await axios.put(`/api/v1/transaction/${transaction.id}`, dataToSend, {
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken
                }
            });
            console.log('Transaction updated successfully:', response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Errore durante il salvataggio delle modifiche:', error);
        }
    };

    if (!isOpen || !transaction) return null;

    return (
        <div className="modal fade show d-block " tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content card-bg-color">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Transaction</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" className="form-control card-bg-color text-white" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transactionPrice">Transaction Price</label>
                                <input type="number" className="form-control card-bg-color text-white" id="transactionPrice" name="transaction_price" value={formData.transaction_price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalSpent">Total Spent</label>
                                <input type="number" className="form-control card-bg-color text-white" id="totalSpent" name="total_spent" value={parseFloat(formData.total_spent).toString()} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transactionDate">Transaction Date</label>
                                <input type="date" className="form-control card-bg-color text-white" id="transactionDate" name="transaction_date" value={formData.transaction_date} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wallet">Wallet</label>
                                <input type="text" className="form-control card-bg-color text-white w-c" id="wallet" name="wallet" value={formData.wallet} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-success" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTransaction;
