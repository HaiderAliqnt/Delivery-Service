# GIKGo — Campus Delivery Network

GIKGo is a peer-to-peer, campus-focused delivery platform that enables students to request items from nearby stores and get them delivered by other students.

It follows a "walk and earn" model where users can earn money by delivering items within campus, making deliveries fast, affordable, and community-driven.

---

## Features

### Customer Side
- Create delivery requests (item, store, notes, location)
- View available deliverers nearby
- Track order status in real-time
- Chat with assigned deliverer
- Rate deliverer after completion

### Deliverer Side
- Toggle availability (ON/OFF)
- View nearby delivery requests
- Accept or reject orders
- Navigate to store and delivery location
- Earn money per delivery

---

## Order Flow

1. Customer creates a delivery request  
2. Nearby deliverers receive the request  
3. A deliverer accepts the order  
4. Deliverer purchases item from store  
5. Deliverer delivers item to customer  
6. Customer confirms delivery and rates deliverer  

---

## Order Status System

- `pending` — Order created  
- `accepted` — Deliverer assigned  
- `picked_up` — Item collected from store  
- `delivered` — Order completed  

---

## Pricing Model

- Base delivery fee  
- Distance-based charges  
- Additional fee for hostel room delivery  

---

## Why GIKGo?

Unlike traditional delivery apps, GIKGo is built specifically for campus environments:

- Optimized for short-distance deliveries  
- No need for vehicles — walk-based system  
- Faster service within hostels and academic areas  
- Enables students to earn while on campus  
- Community-driven and cost-effective  

---

## Tech Stack

- **Frontend:** React 
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Authentication:** JWT 
- **Maps:** Google Maps API  

---

