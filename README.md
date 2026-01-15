# Test Cases – Selenium + Jenkins Automated Testing Mini Project

## Project Name
Automated Web Application Testing using Selenium and Jenkins

## Application Under Test
Demo Web Application (Login-based system)

## Test Environment
- Browser: Google Chrome (Headless)
- Automation Tool: Selenium WebDriver
- Language: Java / Python
- CI Tool: Jenkins
- OS: Windows / Linux
- Build Tool: Maven / pip

---

## Test Case 01: Verify Login with Valid Credentials

**Test Case ID:** TC_LOGIN_001  
**Test Scenario:** User logs in with valid credentials  
**Precondition:** User is registered  
**Steps:**
1. Open the application URL  
2. Enter valid username  
3. Enter valid password  
4. Click Login button  

**Expected Result:**  
User should be redirected to the dashboard page  

**Actual Result:** As expected  
**Status:** Pass  

---

## Test Case 02: Verify Login with Invalid Credentials

**Test Case ID:** TC_LOGIN_002  
**Test Scenario:** User logs in with invalid credentials  
**Precondition:** User is not authenticated  
**Steps:**
1. Open the application URL  
2. Enter invalid username  
3. Enter invalid password  
4. Click Login button  

**Expected Result:**  
Error message should be displayed  

**Actual Result:** As expected  
**Status:** Pass  

---

## Test Case 03: Verify Empty Login Fields

**Test Case ID:** TC_LOGIN_003  
**Test Scenario:** User submits login form without credentials  
**Precondition:** Login page is loaded  
**Steps:**
1. Open the application URL  
2. Leave username field empty  
3. Leave password field empty  
4. Click Login button  

**Expected Result:**  
Validation message should be shown  

**Actual Result:** As expected  
**Status:** Pass  

---

## Test Case 04: Verify Dashboard Page Load

**Test Case ID:** TC_DASHBOARD_001  
**Test Scenario:** Dashboard page loads correctly after login  
**Precondition:** User is logged in  
**Steps:**
1. Login with valid credentials  
2. Observe page title and key elements  

**Expected Result:**  
Dashboard page should load with correct title  

**Actual Result:** As expected  
**Status:** Pass  

---

## Test Case 05: Verify Logout Functionality

**Test Case ID:** TC_LOGOUT_001  
**Test Scenario:** User logs out from the application  
**Precondition:** User is logged in  
**Steps:**
1. Click Logout button  
2. Observe navigation  

**Expected Result:**  
User should be redirected to login page  

**Actual Result:** As expected  
**Status:** Pass  

---

## Test Case 06: Verify Unauthorized Access (Negative Test)

**Test Case ID:** TC_SECURITY_001  
**Test Scenario:** Access dashboard without login  
**Precondition:** User is logged out  
**Steps:**
1. Directly access dashboard URL  

**Expected Result:**  
User should be redirected to login page  

**Actual Result:** As expected  
**Status:** Pass  

---

## Automation Notes
- All test cases are automated using Selenium WebDriver  
- Jenkins executes tests automatically on each build  
- HTML report is generated after execution  
- Screenshots are captured on test failure  

---

## Conclusion
This test suite validates core functionalities of the web application and demonstrates continuous automated testing using Selenium and Jenkins.
