export type Lang = 'en' | 'fr'
export type AccountType = 'buyer' | 'vendor'

export type VendorCategory =
  | 'small_chops'
  | 'nigerian_food'
  | 'drinks_snacks'
  | 'fashion'
  | 'beauty'
  | 'crafts'
  | 'home_goods'
  | 'other'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type DeliveryPartner = 'gig' | 'kwik' | 'sendbox' | 'vendor_rider'

export interface Vendor {
  id: string
  phone: string
  business_name: string
  category: VendorCategory[]
  state: string
  lga: string
  whatsapp?: string
  profile_photo_url?: string
  banner_url?: string
  rating: number
  total_orders: number
  avg_response_mins: number
  is_verified: boolean
  is_pro: boolean
  commission_rate: number
  lang_preference: Lang
  created_at: string
  payout_bank_code?: string
  payout_account?: string
}

export interface Buyer {
  id: string
  phone: string
  name: string
  email?: string
  saved_addresses: Address[]
  account_type: 'retail' | 'event' | 'corporate'
  business_name?: string
  cac_number?: string
  lang_preference: Lang
  created_at: string
}

export interface Address {
  label: string
  state: string
  lga: string
  street: string
  landmark?: string
  is_default: boolean
}

export interface Product {
  id: string
  vendor_id: string
  vendor?: Vendor
  name: string
  name_fr?: string
  description: string
  description_fr?: string
  price_ngn: number
  quantity: number
  category: VendorCategory
  photos_urls: string[]
  video_url?: string
  is_available_today: boolean
  preorder_dates: string[]
  is_flash_sale: boolean
  flash_sale_ends_at?: string
  flash_price?: number
  boost_expires_at?: string
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  price_ngn: number
  quantity: number
  photo_url?: string
}

export interface Order {
  id: string
  buyer_id: string
  vendor_id: string
  items: OrderItem[]
  subtotal: number
  commission: number
  delivery_fee: number
  platform_delivery_cut: number
  total: number
  status: OrderStatus
  delivery_partner?: DeliveryPartner
  tracking_id?: string
  buyer_address: Address
  payment_ref?: string
  payment_method: 'paystack_card' | 'flutterwave' | 'ussd' | 'bank_transfer'
  order_type: 'retail' | 'event' | 'corporate'
  event_date?: string
  is_group_buy: boolean
  group_cart_id?: string
  created_at: string
}

export interface DeliveryOption {
  partner: DeliveryPartner
  label: string
  eta_mins: number
  price_ngn: number
  rating: number
  icon: string
}

export interface AuthUser {
  id: string
  phone: string
  account_type?: AccountType
  onboarded: boolean
}
