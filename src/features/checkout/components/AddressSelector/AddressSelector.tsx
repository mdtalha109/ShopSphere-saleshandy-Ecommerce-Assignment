"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/src/components/ui/Button/Button';
import Input from '@/src/components/ui/Input/Input';
import { useCheckout } from '../../hooks';
import { Address } from '../../types';
import styles from './AddressSelector.module.css';
import { AddressForm } from '../AddressForm';

const AddressSelector = () => {
    const { addresses, selectedAddressId, selectAddress, addAddress } = useCheckout();
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddressSelect = (id: string) => {
        selectAddress(id);
    };


    const handleFormSuccess = (newAddress: Address) => {
        addAddress(newAddress);
        setShowAddForm(false);
    };

    if (addresses.length === 0 && !showAddForm) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Delivery Address</h3>
                </div>

                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📍</div>
                    <p className={styles.emptyText}>No addresses saved yet</p>
                    <Button onClick={() => setShowAddForm(true)}>Add New Address</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Delivery Address</h3>
                <Button size="small" variant="outline" onClick={() => setShowAddForm(true)} className={styles.addButton}>
                    + Add New
                </Button>
            </div>

            <div className={styles.addressList}>
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className={`${styles.addressCard} ${selectedAddressId === address.id ? styles.selected : ''}`}
                        onClick={() => handleAddressSelect(address.id)}
                    >
                        <Input
                            variant="checkbox"
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                            className={styles.radioButton}
                            fullWidth={false}
                        />

                        <div className={styles.addressContent}>
                            <div className={styles.addressName}>{address.name}</div>
                            <div className={styles.addressPhone}>{address.phone}</div>
                            <div className={styles.addressText}>
                                {address.addressLine1}
                                <br />
                                {address.city}, {address.state} - {address.postalCode}
                                <br />
                                {address.country}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {showAddForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Add New Address</h3>
                            <button className={styles.closeButton} onClick={() => setShowAddForm(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <AddressForm onSuccess={handleFormSuccess} onCancel={() => setShowAddForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressSelector;
