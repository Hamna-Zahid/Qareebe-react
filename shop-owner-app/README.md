# Qareebe Merchant App 🏪

The official mobile application for shop owners and merchants integrated into the Qareebe ecosystem. This app provides all the tools necessary to manage a digital storefront on-the-go.

## ✨ Key Features

- **Inventory Management**: Add, edit, and delete products in real-time.
- **AI-Powered Product Entry**: Use AI to auto-fill product details from photos.
- **Order Tracking**: Monitor pending and completed orders from customers.
- **Smart Location**: Automatically update shop address using device GPS.
- **Merchant Verification**: Secure signup and login flow with field masking for privacy.
- **Real-time Sync**: Powered by Firestore for instant updates on the customer-facing app.

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Styling**: Vanilla React Native StyleSheet with Safe Area support
- **Icons**: Ionicons (@expo/vector-icons)

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   Ensure `src/services/firebaseConfig.js` is correctly set up with your project keys.

3. **Launch the App**:
   ```bash
   npx expo start
   ```
   Open on iOS Simulator, Android Emulator, or the Expo Go app on your physical device.

## 📁 Project Structure

- `src/screens/`: All application screens (Dashboard, Inventory, Orders, etc.)
- `src/components/`: Reusable UI elements.
- `src/services/`: Firebase and API configurations.
- `src/context/`: Auth and Application state logic.

---
*Manage your boutique from anywhere with Qareebe Merchant.*
