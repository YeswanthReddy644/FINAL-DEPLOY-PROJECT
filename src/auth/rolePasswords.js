// Central place to define passwords and password-style policies for each role/dashboard.
// WARNING: Storing plaintext passwords on the client is insecure.
// This file is a convenience for local development/demo only. Replace with server-side auth.

const ROLE_MAP = {
  // Faculty requires strong password: mixed case, digit, special, min 8
  Faculty: {
    password: 'Facu1ty@Secure',
    policy: /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
    description: 'At least 8 chars, one uppercase, one lowercase, one digit and one special character',
  },

  // Generic dashboard account
  Dashboard: {
    password: 'dashboard@123',
    policy: /(?=.{6,})/,
    description: 'At least 6 characters',
  },

  // Staff fallback
  Staff: {
    password: 'staffpass',
    policy: /(?=.{6,})/,
    description: 'At least 6 characters',
  },

  // Non-teaching roles with unique styles
  Warden: {
    password: '852963',
    policy: /^\d{6}$/,
    description: 'Exactly 6 digits',
  },

  Caretaker: {
    password: 'caretaker22',
    policy: /^(?=.{6,})[a-z0-9]+$/,
    description: 'Lowercase letters and digits, at least 6 characters',
  },

  'Mess Manager': {
    password: 'MESS-4321',
    policy: /^MESS-\d{4}$/,
    description: "Starts with 'MESS-' followed by 4 digits",
  },

  Accountant: {
    password: 'Acc#2025$',
    policy: /(?=.{8,})(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
    description: 'At least 8 chars, contains letters, digits and special characters',
  },

  Technician: {
    password: 'TECH007',
    policy: /^TECH\d{3}$/,
    description: "Starts with 'TECH' followed by 3 digits",
  },
};

function validateRolePasswordFormat(role, input) {
  const roleObj = ROLE_MAP[role] || ROLE_MAP['Staff'];
  if (!roleObj || !roleObj.policy) return { ok: true };
  const ok = roleObj.policy.test(input);
  return { ok, description: roleObj.description };
}

function getExpectedPassword(role) {
  const roleObj = ROLE_MAP[role] || ROLE_MAP['Staff'];
  return roleObj ? roleObj.password : undefined;
}

export { ROLE_MAP, validateRolePasswordFormat, getExpectedPassword };

