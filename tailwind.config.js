import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
    ],
    safelist: [
        'badge-yellow', 'badge-blue', 'badge-purple', 'badge-green', 'badge-red', 'badge-gray',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    950: '#0a0f1e',
                    900: '#0d1526',
                    800: '#111e35',
                    700: '#162544',
                },
                brand: {
                    DEFAULT: '#1a6dff',
                    dark: '#1458d4',
                    light: '#4d90ff',
                },
            },
            fontFamily: {
                sans: ['Poppins', 'Inter', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
