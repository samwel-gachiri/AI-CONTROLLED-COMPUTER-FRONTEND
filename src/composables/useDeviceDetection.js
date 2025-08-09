import { ref, onMounted, computed } from 'vue'

export function useDeviceDetection() {
    const loading = ref(true)
    const platform = ref('Windows')
    const architecture = ref('x64')

    // Detect user's operating system
    const detectPlatform = () => {
        const userAgent = navigator.userAgent.toLowerCase()
        const platform = navigator.platform.toLowerCase()

        if (userAgent.includes('mac') || platform.includes('mac')) {
            return 'macOS'
        } else if (userAgent.includes('linux') || platform.includes('linux')) {
            return 'Linux'
        } else {
            return 'Windows'
        }
    }

    // Detect architecture
    const detectArchitecture = () => {
        // Modern browsers support this
        if (navigator.userAgentData?.platform) {
            const platformData = navigator.userAgentData.platform.toLowerCase()
            if (platformData.includes('arm') || platformData.includes('aarch64')) {
                return 'arm64'
            }
        }

        // Fallback detection
        const userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.includes('arm') || userAgent.includes('aarch64')) {
            return 'arm64'
        }

        return 'x64'
    }

    const downloadText = computed(() => {
        if (loading.value) return 'Detecting...'

        const platformText = platform.value
        const archText = architecture.value === 'arm64' ? ' (ARM)' : ''

        return `Download for ${platformText}${archText}`
    })

    const getDownloadUrl = () => {
        const baseUrl = '/downloads'
        const platformLower = platform.value.toLowerCase()
        const arch = architecture.value

        const downloadUrls = {
            'windows': {
                'x64': `${baseUrl}/computer-ai-automation-windows-x64.exe`,
                'arm64': `${baseUrl}/computer-ai-automation-windows-arm64.exe`
            },
            'macos': {
                'x64': `${baseUrl}/computer-ai-automation-macos-x64.dmg`,
                'arm64': `${baseUrl}/computer-ai-automation-macos-arm64.dmg`
            },
            'linux': {
                'x64': `${baseUrl}/computer-ai-automation-linux-x64.AppImage`,
                'arm64': `${baseUrl}/computer-ai-automation-linux-arm64.AppImage`
            }
        }

        return downloadUrls[platformLower]?.[arch] || downloadUrls['windows']['x64']
    }

    const handleDownload = () => {
        const downloadUrl = getDownloadUrl()

        // Track download event
        if (window.gtag) {
            window.gtag('event', 'download', {
                'event_category': 'engagement',
                'event_label': `${platform.value}-${architecture.value}`,
                'value': 1
            })
        }

        // Start download
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = ''
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    onMounted(() => {
        // Simulate detection delay for better UX
        setTimeout(() => {
            platform.value = detectPlatform()
            architecture.value = detectArchitecture()
            loading.value = false
        }, 500)
    })

    return {
        loading,
        platform,
        architecture,
        downloadText,
        getDownloadUrl,
        handleDownload
    }
}