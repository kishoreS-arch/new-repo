'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Building, School, Shield, UserCheck, GraduationCap, User, Lock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Role, InstitutionType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language-context';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [role, setRole] = React.useState<Role>('student');
  const [institutionType, setInstitutionType] = React.useState<InstitutionType>('school');
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push(`/${role}`);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <School className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold">ClassSync AI</CardTitle>
            <CardDescription>
              {t('appDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution-type">{t('selectInstitutionType')}</Label>
              <RadioGroup
                value={institutionType}
                onValueChange={(value) => setInstitutionType(value as InstitutionType)}
                id="institution-type"
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="school" id="school" className="peer sr-only" />
                  <Label
                    htmlFor="school"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <School className="mb-3 h-6 w-6" />
                    {t('school')}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="college"
                    id="college"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="college"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    {t('college')}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t('selectYourRole')}</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as Role)}
                disabled={isLoading}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder={t('selectARole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>{t('student')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      <span>{t('teacher')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>{t('admin')}</span>
                    </div>
                  </SelectItem>
                   <SelectItem value="parent">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{t('parent')}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="username">{t('username')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="username" 
                  placeholder={t('enterUsername')}
                  className="pl-10" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder={t('enterPassword')}
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('loggingIn') : t('login')}
            </Button>
            <p className="text-xs text-muted-foreground">
              {t('forgotPassword')} <a href="#" className="text-primary hover:underline">{t('resetHere')}</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
