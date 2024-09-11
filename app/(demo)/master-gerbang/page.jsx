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
import { FilterComponent } from "@/components/client/filter-component";
import LalinDashboardComponent from "@/components/client/lalin-dashboard-component";
import { Suspense } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import DashboardGerbang from "@/components/client/dashbboard-gerbang";

function page(props) {
    return (
        <Suspense fallback={<LoadingComponent />}>
            <ContentLayout title={""}>
                <Card>
                    <CardHeader>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asParent >
                                        <Link href='/master-gerbang'>Master data Gerbang</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </CardHeader>
                    <CardContent>
                        <DashboardGerbang />
                    </CardContent>
                </Card>
            </ContentLayout>
        </Suspense>

    );
}

export default page;
