"""
TrendGear Dashboard - Fase I: Ingeniería y Modelado de Datos
Genera un dataset sintético de 11 columnas siguiendo la metodología de 4 pasos:
1. Crear muestra  2. Limpiar muestra  3. (One-shot prompting simulado aquí vía reglas)  4. Revisión/Validación

Salidas:
  - dataset.csv   (formato CSV, tal como recomienda la guía)
  - dataset.json  (mismo dataset, listo para subir a Firebase Realtime Database)
"""

import csv
import json
import random
from datetime import date, timedelta

random.seed(42)  # reproducibilidad

N_RECORDS = 40

FIRST_NAMES = [
    "Laura", "Carlos", "Ana", "Miguel", "Sofía", "Andrés", "Valentina", "Diego",
    "Camila", "Santiago", "Isabella", "Mateo", "Daniela", "Sebastián", "Mariana",
    "Julián", "Paula", "Nicolás", "Gabriela", "Tomás",
]
LAST_NAMES = [
    "Gómez", "Rodríguez", "Pérez", "Martínez", "López", "García", "Hernández",
    "Ramírez", "Torres", "Flores", "Rivera", "Castro", "Ortiz", "Vargas", "Silva",
]

PRODUCTS = [
    "Laptop Pro 14", "Smartphone X200", "Auriculares NoiseCancel",
    "Smartwatch Fit 3", "Tablet Air 11", "Teclado Mecánico RGB",
    "Mouse Inalámbrico Ergo", "Monitor UltraWide 34", "Cámara Web 4K",
    "Consola GameBox S", "Parlante Bluetooth Boom", "Cargador Rápido 65W",
]

CITIES = [
    "Bogotá", "Medellín", "Cali", "Cúcuta", "Barranquilla",
    "Bucaramanga", "Pereira", "Santa Marta", "Manizales", "Ibagué",
]

PAYMENT_METHODS = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"]
MEMBERSHIP_STATUS = ["Bronze", "Silver", "Gold", "Platinum"]

EMAIL_DOMAIN = "mailinator.com"  # dominio seguro sugerido por la guía


_ACCENTS = str.maketrans("áéíóúÁÉÍÓÚñÑ", "aeiouAEIOUnN")


def strip_accents(text: str) -> str:
    return text.translate(_ACCENTS)


def random_date(start: date, end: date) -> date:
    delta_days = (end - start).days
    return start + timedelta(days=random.randint(0, delta_days))


def build_record(customer_id: int) -> dict:
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)
    name = f"{first} {last}"
    email = f"{strip_accents(first).lower()}.{strip_accents(last).lower()}{customer_id}@{EMAIL_DOMAIN}"

    purchase_date = random_date(date(2024, 1, 1), date(2026, 6, 30))
    # Regla de coherencia cruzada: last_login >= purchase_date y nunca fecha futura
    last_login = random_date(purchase_date, date(2026, 7, 16))

    record = {
        "customer_id": f"CUST-{customer_id:04d}",
        "name": name,
        "email": email,
        "product_purchased": random.choice(PRODUCTS),
        "purchase_date": purchase_date.isoformat(),
        "amount_spent": round(random.uniform(15.99, 2499.99), 2),
        "age": random.randint(18, 65),
        "city": random.choice(CITIES),
        "payment_method": random.choice(PAYMENT_METHODS),
        "last_login_date": last_login.isoformat(),
        "membership_status": random.choice(MEMBERSHIP_STATUS),
    }
    return record


def validate(records: list[dict]) -> list[str]:
    """Checklist de integridad de la guía. Devuelve lista de errores (vacía = OK)."""
    errors = []
    seen_ids = set()
    seen_emails = set()
    today = date(2026, 7, 16)

    for r in records:
        # Unicidad
        if r["customer_id"] in seen_ids:
            errors.append(f"ID duplicado: {r['customer_id']}")
        seen_ids.add(r["customer_id"])

        if r["email"] in seen_emails:
            errors.append(f"Email duplicado: {r['email']}")
        seen_emails.add(r["email"])

        # Números
        if not (13 <= r["age"] <= 100):
            errors.append(f"Edad fuera de rango: {r['customer_id']}")
        if r["amount_spent"] < 0:
            errors.append(f"Monto negativo: {r['customer_id']}")

        # Fechas
        pdate = date.fromisoformat(r["purchase_date"])
        ldate = date.fromisoformat(r["last_login_date"])
        if pdate > today or ldate > today:
            errors.append(f"Fecha futura: {r['customer_id']}")
        if pdate > ldate:
            errors.append(f"Compra posterior al último login: {r['customer_id']}")

        # Categorías normalizadas
        if r["payment_method"] not in PAYMENT_METHODS:
            errors.append(f"Método de pago no normalizado: {r['customer_id']}")

        # Coherencia de dominio de correo
        if not r["email"].endswith(f"@{EMAIL_DOMAIN}"):
            errors.append(f"Dominio de correo no seguro: {r['customer_id']}")

        # Coherencia de ciudad
        if r["city"] not in CITIES:
            errors.append(f"Ciudad fuera de catálogo: {r['customer_id']}")

    return errors


def main():
    records = [build_record(i + 1) for i in range(N_RECORDS)]
    errors = validate(records)

    if errors:
        print("Validación FALLIDA:")
        for e in errors:
            print(" -", e)
        raise SystemExit(1)

    print(f"Validación OK: {len(records)} registros cumplen el checklist de integridad.")

    # --- CSV ---
    fieldnames = list(records[0].keys())
    with open("dataset.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)

    # --- JSON (formato objeto keyed por customer_id, ideal para Firebase RTDB) ---
    json_obj = {r["customer_id"]: r for r in records}
    with open("dataset.json", "w", encoding="utf-8") as f:
        json.dump(json_obj, f, ensure_ascii=False, indent=2)

    print("Archivos generados: dataset.csv, dataset.json")


if __name__ == "__main__":
    main()
