import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// App secret for HMAC signatures (must match server)
const APP_SECRET = import.meta.env.VITE_APP_SECRET || 'your-app-secret-key-here'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const organization = ref(null)
    const token = ref(localStorage.getItem('auth_token'))
    const loading = ref(false)
    const error = ref(null)

    // Getters
    const isAuthenticated = computed(() => !!user.value && !!token.value)
    const userRole = computed(() => user.value?.role || 'employee')
    const isAdmin = computed(() => userRole.value === 'admin')
    const organizationName = computed(() => organization.value?.name || '')

    // Helper function to generate HMAC signature
    const generateSignature = (data) => {
        // Create HMAC-SHA256 signature compatible with server
        const sortedData = JSON.stringify(data, Object.keys(data).sort())
        const signature = CryptoJS.HmacSHA256(sortedData, APP_SECRET).toString(CryptoJS.enc.Hex)

        // Debug logging
        console.log('DEBUG - Data:', sortedData)
        console.log('DEBUG - APP_SECRET:', APP_SECRET)
        console.log('DEBUG - Generated signature:', signature)

        return signature
    }

    // Helper function to generate machine ID
    const generateMachineId = () => {
        // In a real desktop app, this would be a unique machine identifier
        // For web, we'll use a combination of user agent and screen info
        const userAgent = navigator.userAgent
        const screenInfo = `${screen.width}x${screen.height}`
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const combined = `${userAgent}-${screenInfo}-${timezone}`
        return btoa(combined).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32)
    }

    // Helper function to send authentication data to desktop app
    const sendTokenToDesktop = async (userData, token) => {
        try {
            const urlParams = new URLSearchParams(window.location.search)
            const appId = urlParams.get('app_id')

            if (!appId) return

            // Send authentication data to desktop app via API
            await axios.post('/api/desktop/auth/complete', {
                app_id: appId,
                user: userData,
                token: token
            })

            console.log('Desktop authentication completed')

            // Redirect to success page
            const returnUrl = urlParams.get('return_url')
            if (returnUrl) {
                window.location.href = returnUrl
            }

        } catch (error) {
            console.error('Failed to send token to desktop:', error)
        }
    }

    // Actions
    const setUser = (userData) => {
        user.value = userData
        if (userData?.organization) {
            organization.value = userData.organization
        }
    }

    const setToken = (newToken) => {
        token.value = newToken
        if (newToken) {
            localStorage.setItem('auth_token', newToken)
        } else {
            localStorage.removeItem('auth_token')
        }
    }



    const signIn = async (credentials) => {
        loading.value = true
        error.value = null

        try {
            const machineId = credentials.machineId || generateMachineId()

            const data = {
                email: credentials.email,
                password: credentials.password,
                machine_id: machineId
            }

            const signature = generateSignature(data)
            const payload = { ...data, signature }

            const response = await axios.post('/api/auth/login', payload)

            if (response.data.success) {
                const userData = response.data.user
                token.value = response.data.token

                setUser(userData)

                // Store user data and token in localStorage
                localStorage.setItem('user_data', JSON.stringify(userData))
                localStorage.setItem('auth_token', response.data.token)

                // Check if this is a desktop app authentication callback
                const urlParams = new URLSearchParams(window.location.search)
                const isDesktopAuth = urlParams.has('app_id') || urlParams.has('callback')

                if (isDesktopAuth) {
                    await sendTokenToDesktop(userData, response.data.token)
                }

                return { success: true, isDesktopAuth, user: userData }
            } else {
                throw new Error(response.data.error || 'Login failed')
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Sign in failed'
            error.value = errorMessage
            throw new Error(errorMessage)
        } finally {
            loading.value = false
        }
    }

    const signUp = async (userData) => {
        loading.value = true
        error.value = null

        try {
            const machineId = userData.machineId || generateMachineId()
            const passwordHash = hashPassword(userData.password)

            const data = {
                email: userData.email,
                password_hash: passwordHash,
                license_key: userData.licenseKey,
                machine_id: machineId,
                user_type: userData.userType || 'personal'
            }

            const signature = generateSignature(data)
            const payload = { ...data, signature }

            const response = await axios.post('/api/register', payload)

            if (response.data.success) {
                const newUser = {
                    email: userData.email,
                    user_type: userData.userType || 'personal',
                    license_valid: true,
                    expires_at: response.data.license_data.expires_at,
                    machine_id: machineId
                }

                setUser(newUser)

                // Store user data in localStorage
                localStorage.setItem('user_data', JSON.stringify(newUser))

                // Check if this is a desktop app authentication callback
                const urlParams = new URLSearchParams(window.location.search)
                const isDesktopAuth = urlParams.has('app_id') || urlParams.has('callback')

                if (isDesktopAuth) {
                    await sendTokenToDesktop(newUser)
                }

                return { success: true, isDesktopAuth }
            } else {
                throw new Error(response.data.error || 'Registration failed')
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Sign up failed'
            error.value = errorMessage
            throw new Error(errorMessage)
        } finally {
            loading.value = false
        }
    }

    const registerOrganization = async (orgData) => {
        loading.value = true
        error.value = null

        try {
            const data = {
                organization_name: orgData.organizationName,
                organization_email: orgData.organizationEmail,
                organization_description: orgData.organizationDescription || '',
                admin_name: orgData.adminName,
                admin_email: orgData.adminEmail,
                admin_password: orgData.adminPassword
            }

            const signature = generateSignature(data)
            const payload = { ...data, signature }

            const response = await axios.post('/api/organization/register', payload)

            if (response.data.success) {
                const userData = {
                    id: response.data.admin.id,
                    name: response.data.admin.name,
                    email: response.data.admin.email,
                    role: response.data.admin.role,
                    organization: {
                        id: response.data.organization.id,
                        name: response.data.organization.name,
                        email: response.data.organization.email
                    }
                }

                setUser(userData)

                // Store user data in localStorage
                localStorage.setItem('user_data', JSON.stringify(userData))

                // Check if this is a desktop app authentication callback
                const urlParams = new URLSearchParams(window.location.search)
                const isDesktopAuth = urlParams.has('app_id') || urlParams.has('callback')

                if (isDesktopAuth) {
                    // For organization registration, we don't have a token yet
                    // The admin will need to sign in after registration
                    console.log('Organization registered via desktop - admin needs to sign in')
                }

                return { success: true, organization: response.data.organization, admin: response.data.admin, isDesktopAuth }
            } else {
                throw new Error(response.data.error || 'Organization registration failed')
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Organization registration failed'
            error.value = errorMessage
            throw new Error(errorMessage)
        } finally {
            loading.value = false
        }
    }

    const signOut = async () => {
        try {
            // Clear local storage
            localStorage.removeItem('user_data')
            localStorage.removeItem('auth_token')

            // Clear user state
            setUser(null)
            token.value = null
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    const fetchUser = async () => {
        try {
            const storedUserData = localStorage.getItem('user_data')
            if (storedUserData) {
                const userData = JSON.parse(storedUserData)
                setUser(userData)
            }
        } catch (err) {
            console.error('Fetch user error:', err)
            // Clear invalid data
            localStorage.removeItem('user_data')
            setUser(null)
        }
    }

    const verifyLicense = async (licenseKey, machineId) => {
        try {
            const data = {
                license_key: licenseKey,
                machine_id: machineId || generateMachineId()
            }

            const signature = generateSignature(data)
            const payload = { ...data, signature }

            const response = await axios.post('/api/verify', payload)
            return response.data.valid
        } catch (err) {
            console.error('License verification error:', err)
            return false
        }
    }



    // Initialize user if data exists in localStorage
    if (!user.value) {
        fetchUser()
    }

    return {
        // State
        user,
        organization,
        token,
        loading,
        error,

        // Getters
        isAuthenticated,
        userRole,
        isAdmin,
        organizationName,

        // Actions
        signIn,
        signUp,
        signOut,
        fetchUser,
        verifyLicense,
        setUser,
        generateMachineId,
        registerOrganization
    }
})