Perfect ✅ — I’ll fold that new rule into the **full drafted detailed draft** so you have one single document to copy into new chats.

Here’s the updated version with the **time-limited bidding window** and **seller cancel option** added:

---

# Project Summary — Seller & Delivery Guy Dashboards (LocalStorage Only)

### Core decision

* We are **working with localStorage only for now** (no Firebase sync).
* We are focusing on the **seller dashboard** and the **delivery-guy dashboard** (not the orders page itself).
* **Assignment happens between seller and courier**, not on the orders page.

---

## Orders

* Each order is stored in `localStorage['orders']`.
* Fields include:

  * `id, items, buyerName, buyerPhone, address, deliveryNotes`
  * `deliveryCode` — a **4-digit code generated at order creation** (checkout).
  * `bidders` — array of couriers who clicked *Request to deliver*.
  * `assignedTo` — courier id selected by the seller (not set on orders page).
  * `attempts` — failed code entry attempts.
  * `history` — audit log of status changes and actions.
  * `status` — `'processing' | 'assigned' | 'accepted' | 'delivering' | 'at_door' | 'delivered' | 'failed' | 'cancelled'`.
  * `ownerIsDelivering: boolean` — true if seller decides to deliver it themselves.
  * `deliveryRequestExpiry: timestamp` — when the seller’s “ask for delivery” request expires.

---

## Seller Dashboard

* **Sees all orders they created.**
* Can view **bidders** (couriers who requested).
* Can click **Assign** to choose one courier → sets `assignedTo` and `status='assigned'`.
* If **no courier bids within the time window** (e.g., 5 minutes, or configurable 2–3 minutes), the request **expires automatically** and the order switches back to **seller self-delivery**.
* Seller can also **cancel their delivery request manually** (before expiry) → order becomes private to the seller and marked for self-delivery.
* If seller self-delivers (auto or manual), they get the same delivery actions as a courier.
* Tracks order history and can reassign if needed.

---

## Delivery-Guy Dashboard

* **Tabs/filters:**

  * *Open requests* (orders with no `assignedTo` and still within request window)
  * *Assigned to me* (orders where seller assigned me)
  * *All* (for testing/debug).

* **Actions:**

  * If not yet requested → *Request to deliver* (adds courier to bidders).
  * If already requested → *Cancel request*.
  * If assigned to me:

    * *Accept* → `status='accepted'`
    * *Start delivery* → `status='delivering'`
    * *At Door* → `status='at_door'`
    * *Deliver* → enter the one-time `deliveryCode` to confirm → `status='delivered'`

* Wrong code attempts: up to 3, then status → `failed`.

* Orders past their **deliveryRequestExpiry** disappear from *Open requests* automatically.

---

## Status Flow

* `processing` → `assigned` → `accepted` → `delivering` → `at_door` → `delivered`
* At any point can go to `failed` (courier) or `cancelled` (seller).
* **Timeout flow:** If delivery request window expires without bidders, order → `ownerIsDelivering=true` and seller handles delivery.

---

## Important rules

* Seller keeps control (chooses courier from bidders).
* Delivery code is generated at **order creation** and given to buyer.
* Seller fallback: if no bidders within X minutes (e.g., 5 min default), order auto-switches to self-delivery.
* Seller can also cancel a delivery request manually (before expiry).
* Orders page itself does **not** handle assignment — that belongs to seller & delivery dashboards.
* All status changes + actions are recorded in `order.history`.

---

✅ **Next work to do**

* Implement **seller dashboard logic** (show bidders, assign courier, self-deliver, cancel request, handle expiry).
* Implement **delivery dashboard logic** (request/cancel request, accept/start/at door/deliver with code).
* Keep everything in **localStorage** only for now.
* Implement timer/expiry check for delivery requests.

---

Would you like me to add a **sample JSON object of an order** showing bidders, assignedTo, expiry, history, etc., so you can paste that into new chats as an example structure too?
