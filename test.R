#connect libraries to provide reading data from xlsx files
options(java.parameters = "-Xmx2000m")
library(xlsx)
library(jsonlite)
library(plyr)
setwd("/home/user/Al example/Names_f**king_issue/")
#read data from xlsx file 
#data_1 <- read.xlsx("iHome_thngs_4_04_2016-10_04_2016.json", sheetIndex = 1)
#data_1  <- fromJSON(txt = 'ihome_new.json')

data_1 <- fromJSON(txt = 'myjson.json')

data_1$createdAt <- data_1$createdAt/1000
data_1$createdAt <- as.Date(as.POSIXct(data_1$createdAt, origin="1970-01-01"))

data_1$updatedAt <- data_1$updatedAt/1000
data_1$updatedAt <- as.Date(as.POSIXct(data_1$updatedAt, origin="1970-01-01"))

data_1 <- data_1[!is.na(data_1$properties$`~connected`), ]

data_1 <- data_1[data_1$createdAt >= '2015-07-16', ]

data_1 <- data_1[data_1$createdAt <= '2016-09-04', ]

#getting unique serial numbers
unique_SN <- as.character(unique(data_1$identifiers$serial_num)) #910


#vector for unique plugs 
unique_plugs <- data.frame("Id"=character(1), "Owner"=numeric(1),stringsAsFactors=FALSE)

      for (x in unique_SN){
        
        #all rows with serial number equal to x
        tmp <- data_1[data_1$identifiers$serial_num == x,]
        temp <- tmp[which.max(tmp$updatedAt),] 
        unique_plugs <- rbind(unique_plugs, c(temp$id, temp$identifiers$owner))
      }




#the distribution of plugs for Owners that have:
#1,2,3,4,5 6-10, 11-20, 21+
num_plug_distr <-data.frame("OwnerId"=character(1), "PlugNumber"=numeric(1),stringsAsFactors=FALSE)

unique_owners <- as.character(unique(unique_plugs$Owner))#705

  for (x in unique_owners){
    #all rows with serial number equal to x
    tmp <- unique_plugs[unique_plugs$Owner == x,]
    num_plug_distr <- rbind(num_plug_distr, c(x,length(tmp$Id)))
  }
 
colnames(unique_owners) <- c("OwnerId", "PlugNumber")
t <- table(data_1$createdAt)
View(tail(t,7))
View(sort(table(num_plug_distr$PlugNumber), decreasing = TRUE))

num_plug_distr[which(num_plug_distr$PlugNumber == "30"),]$OwnerId
num_plug_distr[which(num_plug_distr$PlugNumber == "32"),]$OwnerId
num_plug_distr[which(num_plug_distr$PlugNumber == "21"),]$OwnerId
num_plug_distr[which(num_plug_distr$PlugNumber == "22"),]$OwnerId
num_plug_distr[which(num_plug_distr$PlugNumber == "26"),]$OwnerId


 

# HK ID's 139


# Owner ID - Count the number of Valid plugs owned by each ID              |  (the same that distr.)
# Owner ID - Count of the total of Unique Owner ID’s                       |  705
# HK ID - is greater than errr 16 Characters? I’l have to check that one   |  139 HK Id's got from iOS
# Checks for plugs that have an entry for (Owner ID, Serial Number, HK ID) |  920 (all values is)
#   And Yep, the distribution of plugs for Owners that have:
#   1,2,3,4,5 6-10, 11-20, 21+

# 1   2   3   4   5   6   7  -- count of plugs
# 562  97  32   6   5   2   1 -- count of owner


all_sold_plugs <- data.frame()
#options(stringsAsFactors = FALSE)
all_sold_plugs <- rbind(all_sold_plugs, c(as.Date(min(as.character(unique_plugs2$Created))),0))
all_sold_plugs <- rbind(all_sold_plugs, c(as.Date(max(as.character(unique_plugs2$Created))),length(unique_SN)))
all_sold_plugs <- rbind(all_sold_plugs, c(as.Date(max(as.character(unique_plugs2$Created))),length(unique_SN2)+length(unique_SN)))

############# reading data from json #######
json_data <- fromJSON(txt = 'historic.json')
json_data$createdAt <- json_data$createdAt/1000
json_data$createdAt <- as.Date(as.POSIXct(json_data$createdAt, origin="1970-01-01"))


t <- table(data_1$createdAt)
t_sum <- tapply(t, (seq_along(t)-1) %/% 7, sum)
t_cum <- cumsum(t_sum)
xlabels = seq(as.Date("2015-06-28"), as.Date("2016-05-01"), by="weeks")
if(length(xlabels) != length(t_cum)){
  xlabels = c(xlabels, " ")
}
plot(1:length(t_cum),t_cum, xaxt="n",main="", xlab ="", type = "l", ylab = "Historical cumulative data")
points(1:length(t_cum),t_cum)
axis(1, at=1:46, labels=xlabels, las = 2, cex.axis = 0.8)

text(1:length(t_cum)- 1, t_cum + 5, t_cum, srt=90)


write.xlsx(t_cum, "t_cum.xlsx", sheetName="Sheet2", col.names=TRUE, row.names=TRUE, append=FALSE, showNA=TRUE)

LL <- list()
for(datetime in y){
  str1 = strsplit(datetime, " ", fixed = FALSE, perl = FALSE, useBytes = FALSE)
  time = str1[[1]][2]
  date = str1[[1]][1]
  datelist = strsplit(date, "-", fixed = FALSE, perl = FALSE, useBytes = FALSE)
  x = paste(datelist[[1]][3], "/",sep="")
  x = paste(x, datelist[[1]][2],sep="")
  x = paste(x, "/",sep="")
  x = paste(x, datelist[[1]][1],sep="")
  x = paste(x, " ",sep="")
  x = paste(x, time,sep="")
  LL <- c(LL, x)
  
  
}

LL <- list()
for(datetime in y){
  x = " "
 if(!is.na(datetime)) {
  datelist = strsplit(datetime, "-", fixed = FALSE, perl = FALSE, useBytes = FALSE)
  x = paste(datelist[[1]][1], "/",sep="")
  x = paste(x, datelist[[1]][2],sep="")
  x = paste(x, "/",sep="")
  x = paste(x, datelist[[1]][3],sep="")
 

 }
  LL <- c(LL, x)
  
}
