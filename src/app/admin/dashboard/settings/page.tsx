"use client";

import { Save } from "lucide-react";
import { AdminTabHeader } from "@/components/admin/AdminTabHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/store/useToast";

export default function SettingsPage() {
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({ message: "Settings saved successfully", variant: "success" });
  };

  return (
    <div className="p-6 space-y-6">
      <AdminTabHeader
        title="Settings"
        onSearch={() => {}} // Not needed for settings
        view="table"
        onViewChange={() => {}} // Not needed
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* General System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>General System</CardTitle>
            <CardDescription>
              Manage your platform's base configuration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="BriefCV Admin" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch id="maintenance-mode" />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Access</CardTitle>
            <CardDescription>
              Configure authentication and session policies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mfa-required">Enforce MFA</Label>
              <Switch id="mfa-required" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API & Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>API & Integrations</CardTitle>
          <CardDescription>
            Manage third-party connections and credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="google-api-key">Google API Key</Label>
              <Input
                id="google-api-key"
                type="password"
                defaultValue="••••••••••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openai-api-key">OpenAI API Key</Label>
              <Input
                id="openai-api-key"
                type="password"
                defaultValue="••••••••••••••••"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Action */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
