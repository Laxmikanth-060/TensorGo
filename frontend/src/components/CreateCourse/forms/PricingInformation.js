import React, { useState } from 'react';
import styles from './PricingInformation.module.css';

const PricingInformation = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateData({ ...formData, [name]: value }); // Update parent component data
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h5 className={styles.title}>Pricing Information</h5>
        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="upiId" className={styles.label}>UPI ID</label>
          <input
            type="text"
            id="upiId"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PricingInformation;
