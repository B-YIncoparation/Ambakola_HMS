package codeLK.HotelManagementSystem.Payments;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection = "Payments")
@NoArgsConstructor
@AllArgsConstructor
public class Payments {
    @Id
    private ObjectId id;

    private Integer amount;// Payment amount


    private String paymentMethod;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME ,pattern =  "yyyy-MM-dd")
    private Date date;

    public Payments(Integer amount, String paymentMethod,Date date) {

        this.amount = amount;
        this.paymentMethod=paymentMethod;
        this.date=date;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}






