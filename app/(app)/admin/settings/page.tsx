
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Globe, Palette, Bell, Shield } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function SettingsPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSave = (section: string) => {
    toast({
      title: t('settingsSaved'),
      description: t('settingsUpdated').replace('{section}', section),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general"><Globe className="mr-2 h-4 w-4" />{t('general')}</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />{t('appearance')}</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />{t('notifications')}</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />{t('security')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('generalInformation')}</CardTitle>
              <CardDescription>{t('updateInstitutionDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school-name">{t('institutionName')}</Label>
                <Input id="school-name" defaultValue="ClassSync AI School" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-address">{t('address')}</Label>
                <Input id="school-address" defaultValue="123 Education Lane, Knowledge City, 45678" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="school-contact">{t('contactNumber')}</Label>
                <Input id="school-contact" type="tel" defaultValue="+1 (234) 567-890" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave(t('general'))}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t('appearance')}</CardTitle>
              <CardDescription>{t('customizeAppearance')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>{t('theme')}</Label>
                    <p className="text-sm text-muted-foreground">{t('themeDescription')}</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="primary-color">{t('primaryColor')}</Label>
                    <Input id="primary-color" defaultValue="231 48% 48%" />
                    <p className="text-xs text-muted-foreground">{t('primaryColorDescription')}</p>
                </div>
            </CardContent>
             <CardFooter>
              <Button onClick={() => handleSave(t('appearance'))}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications')}</CardTitle>
              <CardDescription>{t('manageNotifications')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-new-user" className="text-base">{t('newUserRegistration')}</Label>
                  <p className="text-sm text-muted-foreground">{t('newUserEmail')}</p>
                </div>
                <Switch id="email-new-user" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                 <div className="space-y-0.5">
                  <Label htmlFor="email-reports" className="text-base">{t('systemReports')}</Label>
                  <p className="text-sm text-muted-foreground">{t('weeklyReports')}</p>
                </div>
                <Switch id="email-reports" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave(t('notifications'))}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
           <Card>
            <CardHeader>
              <CardTitle>{t('security')}</CardTitle>
              <CardDescription>{t('configureSecurity')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="password-policy">{t('passwordMinLength')}</Label>
                <Input id="password-policy" type="number" defaultValue="8" />
                <p className="text-xs text-muted-foreground">{t('passwordMinLengthDescription')}</p>
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor" className="text-base">{t('enable2FA')}</Label>
                  <p className="text-sm text-muted-foreground">{t('enable2FADescription')}</p>
                </div>
                <Switch id="two-factor" disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave(t('security'))}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
