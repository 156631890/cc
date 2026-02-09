"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Price } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/animations/index";
import { useCartStore, useCartTotals } from "@/lib/store";
import type { CustomerInfo, ShippingAddress } from "@/types";

type Step = "customer" | "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const { total, subtotal, tax, shipping } = useCartTotals();

  const [step, setStep] = useState<Step>("customer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveInfo, setSaveInfo] = useState(false);

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === "customer") {
      if (!customerInfo.firstName) newErrors.firstName = "First name is required";
      if (!customerInfo.lastName) newErrors.lastName = "Last name is required";
      if (!customerInfo.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(customerInfo.email))
        newErrors.email = "Invalid email address";
      if (!customerInfo.phone) newErrors.phone = "Phone is required";
    }

    if (currentStep === "shipping") {
      if (!shippingAddress.addressLine1)
        newErrors.addressLine1 = "Address is required";
      if (!shippingAddress.city) newErrors.city = "City is required";
      if (!shippingAddress.state) newErrors.state = "State is required";
      if (!shippingAddress.postalCode) newErrors.postalCode = "Zip code is required";
      if (!shippingAddress.country) newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === "customer") {
        setShippingAddress((prev) => ({
          ...prev,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          phone: customerInfo.phone,
        }));
        setStep("shipping");
      } else if (step === "shipping") {
        setStep("payment");
      } else if (step === "payment") {
        setStep("review");
      }
    }
  };

  const handleBack = () => {
    if (step === "shipping") setStep("customer");
    else if (step === "payment") setStep("shipping");
    else if (step === "review") setStep("payment");
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // In production, this would create a Stripe checkout session
    router.push("/checkout/success");
  };

  const steps = [
    { id: "customer" as Step, label: "Contact" },
    { id: "shipping" as Step, label: "Shipping" },
    { id: "payment" as Step, label: "Payment" },
    { id: "review" as Step, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-text-muted/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold">
              <span className="text-primary">Checkout</span>
            </h1>
            {/* Progress */}
            <div className="flex items-center justify-between mt-8 max-w-2xl">
              {steps.map((s, index) => (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                        step === s.id
                          ? "bg-primary text-background"
                          : steps.findIndex((st) => st.id === step) >
                            steps.findIndex((st) => st.id === s.id)
                          ? "bg-primary/20 text-primary"
                          : "bg-surface border border-text-muted/20 text-text-muted"
                      }`}
                    >
                      {steps.findIndex((st) => st.id === step) >
                      steps.findIndex((st) => st.id === s.id)
                        ? "✓"
                        : index + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        step === s.id ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-text-muted/20 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn>
              <Card>
                <CardContent className="p-8">
                  {/* Customer Info */}
                  {step === "customer" && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-2xl font-semibold">
                        Contact Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={customerInfo.firstName}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, firstName: e.target.value })
                          }
                          error={errors.firstName}
                        />
                        <Input
                          label="Last Name"
                          value={customerInfo.lastName}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, lastName: e.target.value })
                          }
                          error={errors.lastName}
                        />
                      </div>
                      <Input
                        label="Email Address"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        error={errors.email}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, phone: e.target.value })
                        }
                        error={errors.phone}
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={saveInfo}
                          onChange={(e) => setSaveInfo(e.target.checked)}
                          className="w-4 h-4 rounded border-text-muted/30 bg-transparent text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-text-muted">
                          Save my information for faster checkout
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Shipping Address */}
                  {step === "shipping" && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-2xl font-semibold">
                        Shipping Address
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={shippingAddress.firstName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                          }
                        />
                        <Input
                          label="Last Name"
                          value={shippingAddress.lastName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                          }
                        />
                      </div>
                      <Input
                        label="Address Line 1"
                        value={shippingAddress.addressLine1}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            addressLine1: e.target.value,
                          })
                        }
                        error={errors.addressLine1}
                      />
                      <Input
                        label="Address Line 2 (Optional)"
                        value={shippingAddress.addressLine2 || ""}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            addressLine2: e.target.value,
                          })
                        }
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={shippingAddress.city}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                          }
                          error={errors.city}
                        />
                        <Input
                          label="State"
                          value={shippingAddress.state}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, state: e.target.value })
                          }
                          error={errors.state}
                        />
                        <Input
                          label="Postal Code"
                          value={shippingAddress.postalCode}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              postalCode: e.target.value,
                            })
                          }
                          error={errors.postalCode}
                        />
                      </div>
                      <Input
                        label="Country"
                        value={shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  {/* Payment */}
                  {step === "payment" && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-2xl font-semibold">
                        Payment Method
                      </h2>
                      <p className="text-text-muted text-sm">
                        All transactions are secure and encrypted.
                      </p>

                      {/* Payment Methods */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-4 p-4 border border-text-muted/20 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked
                            className="w-4 h-4 border-text-muted/30 bg-transparent text-primary focus:ring-primary"
                          />
                          <CreditCard className="w-5 h-5 text-text-muted" />
                          <span className="font-medium">Credit / Debit Card</span>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-text-muted/20 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            className="w-4 h-4 border-text-muted/30 bg-transparent text-primary focus:ring-primary"
                          />
                          <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xs">PayPal</span>
                          </div>
                          <span className="font-medium">PayPal</span>
                        </label>
                      </div>

                      {/* Card Details (Demo) */}
                      <div className="space-y-4 pt-4 border-t border-text-muted/10">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="Expiry Date" placeholder="MM / YY" />
                          <Input label="CVV" placeholder="123" />
                        </div>
                        <Input label="Name on Card" />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Lock className="w-4 h-4" />
                        Your payment information is secure and encrypted
                      </div>
                    </div>
                  )}

                  {/* Review */}
                  {step === "review" && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-2xl font-semibold">
                        Review Your Order
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-primary mb-2">Contact</h3>
                          <p className="text-text-muted">
                            {customerInfo.firstName} {customerInfo.lastName}
                          </p>
                          <p className="text-text-muted">{customerInfo.email}</p>
                          <p className="text-text-muted">{customerInfo.phone}</p>
                        </div>

                        <div>
                          <h3 className="font-medium text-primary mb-2">Ship To</h3>
                          <p className="text-text-muted">
                            {shippingAddress.firstName} {shippingAddress.lastName}
                          </p>
                          <p className="text-text-muted">{shippingAddress.addressLine1}</p>
                          {shippingAddress.addressLine2 && (
                            <p className="text-text-muted">
                              {shippingAddress.addressLine2}
                            </p>
                          )}
                          <p className="text-text-muted">
                            {shippingAddress.city}, {shippingAddress.state}{" "}
                            {shippingAddress.postalCode}
                          </p>
                          <p className="text-text-muted">{shippingAddress.country}</p>
                        </div>

                        <div>
                          <h3 className="font-medium text-primary mb-2">Payment Method</h3>
                          <p className="text-text-muted flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Credit Card ending in **** 3456
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-text-muted text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <Price
                        price={item.product.price * item.quantity}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-4 border-t border-text-muted/10">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <Price price={subtotal} />
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Shipping</span>
                    <Price price={shipping} />
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Tax</span>
                    <Price price={tax} />
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-text-muted/10">
                    <span>Total</span>
                    <Price price={total} size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === "customer"}
          >
            Back
          </Button>
          {step !== "review" ? (
            <Button size="lg" variant="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button
              size="lg"
              variant="primary"
              onClick={handleSubmitOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
