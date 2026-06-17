import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) return '+234' + cleaned.slice(1)
  if (cleaned.startsWith('234')) return '+' + cleaned
  return phone
}

export function validateNigerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return /^(0[789][01]\d{8}|234[789][01]\d{8})$/.test(cleaned)
}

export const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue',
  'Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara',
  'Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau',
  'Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'
]

export const VENDOR_CATEGORIES = [
  { value: 'small_chops',   label_en: '🍱 Small Chops',     label_fr: '🍱 Petits Fours' },
  { value: 'nigerian_food', label_en: '🍲 Nigerian Food',    label_fr: '🍲 Cuisine Nigériane' },
  { value: 'drinks_snacks', label_en: '🥤 Drinks & Snacks',  label_fr: '🥤 Boissons & Snacks' },
  { value: 'fashion',       label_en: '👗 Fashion',           label_fr: '👗 Mode' },
  { value: 'beauty',        label_en: '💄 Beauty & Skincare', label_fr: '💄 Beauté & Soins' },
  { value: 'crafts',        label_en: '🎨 Crafts & Art',      label_fr: '🎨 Artisanat & Art' },
  { value: 'home_goods',    label_en: '🏠 Home Goods',        label_fr: '🏠 Articles Ménagers' },
  { value: 'other',         label_en: '📦 Other',             label_fr: '📦 Autre' },
]
