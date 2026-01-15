# Test Cases – Selenium + Jenkins Automated Testing Mini Project

## TC_LOGIN_001 – Login with Valid Credentials

| Field | Details |
|------|--------|
| Test Case ID | TC_LOGIN_001 |
| Test Scenario | Login with valid credentials |
| Preconditions | User is registered |
| Test Steps | 1. Open application URL<br>2. Enter valid username<br>3. Enter valid password<br>4. Click Login |
| Expected Result | User is redirected to dashboard |
| Actual Result | As expected |
| Status | Pass |

---

## TC_LOGIN_002 – Login with Invalid Credentials

| Field | Details |
|------|--------|
| Test Case ID | TC_LOGIN_002 |
| Test Scenario | Login with invalid credentials |
| Preconditions | User not authenticated |
| Test Steps | 1. Open application URL<br>2. Enter invalid username<br>3. Enter invalid password<br>4. Click Login |
| Expected Result | Error message is displayed |
| Actual Result | As expected |
| Status | Pass |

---

## TC_LOGIN_003 – Login with Empty Fields

| Field | Details |
|------|--------|
| Test Case ID | TC_LOGIN_003 |
| Test Scenario | Login with empty input fields |
| Preconditions | Login page is loaded |
| Test Steps | 1. Open application URL<br>2. Leave username empty<br>3. Leave password empty<br>4. Click Login |
| Expected Result | Validation message is shown |
| Actual Result | As expected |
| Status | Pass |

---

## TC_DASHBOARD_001 – Dashboard Page Load

| Field | Details |
|------|--------|
| Test Case ID | TC_DASHBOARD_001 |
| Test Scenario | Verify dashboard page load |
| Preconditions | User is logged in |
| Test Steps | 1. Login with valid credentials<br>2. Verify page title and elements |
| Expected Result | Dashboard page loads correctly |
| Actual Result | As expected |
| Status | Pass |

---

## TC_LOGOUT_001 – Logout Functionality

| Field | Details |
|------|--------|
| Test Case ID | TC_LOGOUT_001 |
| Test Scenario | Verify logout functionality |
| Preconditions | User is logged in |
| Test Steps | 1. Click Logout button |
| Expected Result | User redirected to login page |
| Actual Result | As expected |
| Status | Pass |

---

## TC_SECURITY_001 – Unauthorized Access

| Field | Details |
|------|--------|
| Test Case ID | TC_SECURITY_001 |
| Test Scenario | Access dashboard without login |
| Preconditions | User is logged out |
| Test Steps | 1. Directly access dashboard URL |
| Expected Result | User redirected to login page |
| Actual Result | As expected |
| Status | Pass |

---

## Notes
- All test cases are automated using Selenium WebDriver  
- Jenkins executes tests automatically and generates reports  
- Screenshots are captured on test failures  

