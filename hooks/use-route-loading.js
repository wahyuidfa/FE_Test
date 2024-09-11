"use client"
import { useRouter } from "next/navigation";
import useLoadingStore from "./use-loding-store";
const useRouteLoading = () => {
    const router = useRouter();
    const showLoading = useLoadingStore((state) => state.showLoading);
    const showLoadingWithDelay = useLoadingStore((state) => state.showLoadingWithDelay);
    const hideLoading = useLoadingStore((state) => state.hideLoading);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            console.log('Route change started');
            showLoading(); // Show loading when navigation starts
        };

        const handleRouteChangeComplete = () => {
            console.log('Route change completed');
            showLoadingWithDelay(2000); // Hide loading after 2 seconds when navigation is done
        };

        const handleRouteChangeError = () => {
            console.log('Route change error');
            hideLoading(); // Hide loading if there is an error
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, [router, showLoading, showLoadingWithDelay, hideLoading]);
};

export default useRouteLoading;
