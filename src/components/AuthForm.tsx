import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonLink?: string;
}

const AuthForm = ({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerLinkText,
  showBackButton = true,
  backButtonText = "Back to home",
  backButtonLink = "/"
}: AuthFormProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {showBackButton && (
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to={backButtonLink} className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backButtonText}
              </Link>
            </Button>
          </div>
        )}
        
        <Card className="card-automotive">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children}
          </CardContent>
        </Card>

        {footerText && footerLink && footerLinkText && (
          <div className="text-center text-sm">
            <span className="text-muted-foreground">{footerText} </span>
            <Link to={footerLink} className="text-primary hover:underline">
              {footerLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
