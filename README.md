#  GIKGo — Smart Campus Delivery & Micro-Logistics Network


<img width="330" height="659" alt="image" src="https://github.com/user-attachments/assets/f639352a-1c25-4141-94c0-279d517e4822" />

GIKGo is a peer-to-peer, campus-focused delivery and logistics platform designed specifically for environments like GIKI. It enables students to request items from nearby stores and have them delivered by other students within campus.

Unlike traditional delivery systems, GIKGo introduces **intelligent matching, delivery batching, and zone-based optimization**, making it highly efficient for short-distance, high-frequency campus logistics.

---

##  Problem Statement

Campus environments face a unique logistical inefficiency:

- Students frequently need items from distant campus stores
- Walking long distances is time-consuming and inconvenient
- Traditional delivery services are too expensive for short distances
- No platform exists for micro-scale, peer-to-peer delivery within campus

GIKGo addresses these challenges by enabling fast, affordable, and community-driven deliveries.

---

## Objectives

- Minimize delivery time within campus
- Optimize deliverer assignment using proximity and availability
- Enable multiple deliveries per trip (batching)
- Maintain a trust-based ecosystem using ratings and reputation
- Design a scalable and efficient relational database system

---

##  Core Features

###  Customer Module
- Create delivery requests (item, store, notes, location)
- View estimated pricing before placing order
- Track order status in real-time
- Chat with deliverer
- Rate and review deliverer

---

###  Deliverer Module
- Toggle availability (ON/OFF)
- View nearby delivery requests
- Accept or reject orders
- Handle multiple deliveries (batching)
- Navigate to store and delivery location
- Earn per delivery

---

###  Smart Matching System
- Assigns delivery requests based on:
  - Distance
  - Deliverer rating
  - Availability
- Logs all matching attempts for analysis

---

###  Delivery Batching (Key Feature)
- Groups nearby orders into a single batch
- Reduces redundant trips
- Improves delivery efficiency

---

###  Zone-Based Optimization
- Campus divided into zones:
  - Hostels
  - Academic blocks
  - Cafeterias
- Matching and pricing optimized per zone

---

###  Pricing System
- Base delivery fee
- Distance-based pricing
- Zone-based multipliers
- Peak-time adjustments

---

###  Reputation System
- Ratings and feedback after each delivery
- Trust score for deliverers
- Penalty tracking for cancellations/delays

---

###  Communication System
- Real-time chat between customer and deliverer
- Notifications for order updates

---

##  Order Lifecycle

1. Customer creates delivery request  
2. System notifies nearby deliverers  
3. Deliverer accepts the request  
4. Orders may be grouped into a batch  
5. Deliverer picks up items  
6. Deliverer completes delivery  
7. Customer confirms and rates  

---

##  Database Design Overview

###  Core Entities

- **Users** (customers & deliverers)
- **Locations**
- **Zones**
- **DeliveryRequests**
- **Orders**
- **OrderBatches**
- **DelivererAvailability**
- **MatchingLogs**
- **Payments**
- **Ratings**
- **Messages**
- **Notifications**
- **PricingRules**

---

###  Key Relationships

- One user → many delivery requests  
- One deliverer → many orders  
- One batch → many orders  
- One order → one payment  
- One order → many messages  
- Locations belong to zones  

---

##  Technology Stack

- **Frontend:** React  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **Maps & Location:** Google Maps API  

---

##  Novelty & Differentiation

GIKGo differs from traditional delivery platforms (e.g., Foodpanda, Careem) in several ways:

- Designed specifically for **closed-campus environments**
- Supports **walking-based delivery system**
- Introduces **delivery batching**
- Uses **zone-based optimization**
- Implements **intelligent matching with logged decisions**

---

##  Development Plan

1. Requirement analysis  
2. ER diagram design  
3. Database schema creation  
4. Backend API development  
5. Matching & batching logic implementation  
6. Frontend integration  
7. Testing and optimization  

---

##  Target Users

- Students living on campus
- Students looking to earn through deliveries
- Campus shops and service providers (future extension)


## Conclusion

GIKGo is a scalable, efficient, and community-driven delivery system tailored for campus environments. It combines strong database design with practical system implementation, making it both academically rigorous and industry-relevant.
