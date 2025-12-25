"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettings() {
    return (
        <div className="p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">System Settings</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Configuration</CardTitle>
                        <CardDescription>Basic settings for your helpdesk instance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Helpdesk Name</Label>
                            <Input defaultValue="My Awesome Helpdesk" />
                        </div>
                        <div>
                            <Label>Support Email Address</Label>
                            <Input defaultValue="support@example.com" />
                        </div>
                        <div>
                            <Label>Base URL</Label>
                            <Input defaultValue="http://localhost:3000" />
                        </div>
                        <Button>Save General Settings</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Email Server (SMTP)</CardTitle>
                        <CardDescription>Configure outgoing email settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>SMTP Host</Label>
                                <Input defaultValue="localhost" />
                            </div>
                            <div>
                                <Label>SMTP Port</Label>
                                <Input defaultValue="1025" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Username</Label>
                                <Input placeholder="user/apikey" />
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                        </div>
                        <Button variant="secondary">Test Connection</Button>
                        <Button className="ml-2">Save Email Settings</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
