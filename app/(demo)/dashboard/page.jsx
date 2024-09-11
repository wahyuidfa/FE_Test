import { ContentLayout } from "@/components/content-layout";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DatePicker } from "@/components/client/date-picker";
import { CalendarForm } from "@/components/client/calendar-form";
import DashboardComponents from "@/components/client/dashboard-component";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingComponent from "@/components/LoadingComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardComponent = dynamic(() => import('../../../components/client/dashboard-component'))
function page(props) {


    return (
        <Suspense fallback={<LoadingComponent />}>
            <ContentLayout title={""}>
                <Card>

                    <CardHeader>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink >
                                        <Link href='/dashboard'>Dashboard</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </CardHeader>
                    <CardContent>
                        <CalendarForm />
                        <DashboardComponent />
                    </CardContent>
                </Card>
            </ContentLayout>
        </Suspense>
    );
}

export default page;
