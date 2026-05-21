"use client";

import Button from '@/src/components/ui/Button/Button';
import Input from '@/src/components/ui/Input/Input';
import { useAddressForm } from '../../hooks';
import { Address } from '../../types';
import styles from './AddressForm.module.css';

interface AddressFormProps {
  onSuccess?: (address: Address) => void;
  onCancel?: () => void;
}

const AddressForm = ({ onSuccess, onCancel }: AddressFormProps) => {
  const { formData, fieldErrors, isSubmitting, updateField, handleSubmit } = useAddressForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name<span className={styles.required}>*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter your full name"
            disabled={isSubmitting}
            error={!!fieldErrors.name}
            errorMessage={fieldErrors.name}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number<span className={styles.required}>*</span>
          </label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="10-digit mobile number"
            disabled={isSubmitting}
            error={!!fieldErrors.phone}
            errorMessage={fieldErrors.phone}
            required
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="addressLine1" className={styles.label}>
          Address Line 1<span className={styles.required}>*</span>
        </label>
        <Input
          id="addressLine1"
          value={formData.addressLine1}
          onChange={(e) => updateField('addressLine1', e.target.value)}
          placeholder="House No., Building Name"
          disabled={isSubmitting}
          error={!!fieldErrors.addressLine1}
          errorMessage={fieldErrors.addressLine1}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="addressLine2" className={styles.label}>
          Address Line 2
        </label>
        <Input
          id="addressLine2"
          value={formData.addressLine2 || ''}
          onChange={(e) => updateField('addressLine2', e.target.value)}
          placeholder="Road name, Area, Colony"
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="city" className={styles.label}>
            City<span className={styles.required}>*</span>
          </label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="City"
            disabled={isSubmitting}
            error={!!fieldErrors.city}
            errorMessage={fieldErrors.city}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="state" className={styles.label}>
            State<span className={styles.required}>*</span>
          </label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value)}
            placeholder="State"
            disabled={isSubmitting}
            error={!!fieldErrors.state}
            errorMessage={fieldErrors.state}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="postalCode" className={styles.label}>
            Postal Code<span className={styles.required}>*</span>
          </label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateField('postalCode', e.target.value)}
            placeholder="6-digit PIN code"
            disabled={isSubmitting}
            error={!!fieldErrors.postalCode}
            errorMessage={fieldErrors.postalCode}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="country" className={styles.label}>
            Country<span className={styles.required}>*</span>
          </label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => updateField('country', e.target.value)}
            placeholder="Country"
            disabled={isSubmitting}
            error={!!fieldErrors.country}
            errorMessage={fieldErrors.country}
            required
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting} fullWidth>
          {isSubmitting ? 'Saving...' : 'Save Address'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} fullWidth>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default AddressForm;